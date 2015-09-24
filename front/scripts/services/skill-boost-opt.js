'use strict';

/**
 * @ngdoc service
 * @name tbsApp.skillBoostOpt
 * @description
 * # skillBoostOpt
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('SkillBoostOptimizer', function($filter) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var sbo = {};

    sbo.p_skill_up = function(skills) {
        skills = $filter('orderBy')(skills, 'base_emit_ratio', false);
        var p_sup = { 1: [], 2: [], 3: [] };
        
        for (var i = 0; i < skills.length; ++i) {
            var skill = skills[i];
            skill.p_sup = (skill.emit_ratio / 100) * (0.02 / (skill.base_emit_ratio / 100));
            // truncate
            skill.p_sup = parseInt(skill.p_sup * 100) / 100;
            var coeff = p_sup[skill.phase].reduce(function(p, c){ return p * (1 - c.emit_ratio / 100); }, 1);
            skill.p_gain = coeff * skill.p_sup;
            p_sup[skill.phase].push(skill);
        }
        var detail = {
            1: p_sup[1].reduce(function(p, c){ return p + c.p_gain; }, 0),
            2: p_sup[2].reduce(function(p, c){ return p + c.p_gain; }, 0),
            3: p_sup[3].reduce(function(p, c){ return p + c.p_gain; }, 0)
        };
        return {
            detail: detail,
            sum: [
                p_sup[1].reduce(function(p, c){ return p + c.p_gain; }, 0),
                p_sup[2].reduce(function(p, c){ return p + c.p_gain; }, 0),
                p_sup[3].reduce(function(p, c){ return p + c.p_gain; }, 0)
            ].reduce(function(p, c){ return p + c; }, 0)
        };
    };

    sbo.avg_activation_rate = function(skills){
        
        var sum = skills.reduce(function(p, c){
            return p + c.emit_ratio;
        }, 0);
        return sum / skills.length;
    };

    sbo.fact = function(f) { return (f === 0) ? 1 : f * this.fact(f - 1); };

    sbo.binomial_coeff = function(n, k) {
        var coeff = 1, i;
        for (i = n - k + 1; i <= n; i++){ coeff *= i; }
        for (i = 1; i <= k; i++){ coeff /= i; }
        return coeff;
    };
    
    /**
     * n experiment, k success, p success rate
     * @param {type} n
     * @param {type} k
     * @returns {_L3.sbo@call;fact|Number}
     */
    sbo.binomial_distribution = function(n, k, p) {
        // P(X=k) = (n k) * p ^ k * (1-p)^(n-k)
        return this.binomial_coeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    };

    sbo.neg_bin = function(n, k, p) {
        // P(X=k) = (k+n+1 n-1) * p^n * (1-p)^k
        return this.binomial_coeff(k + n - 1, k) * Math.pow(p, n) * Math.pow(1 - p, k);
    };

    sbo.mean_neg_bin = function(r, p) {
        return (r * p) / (1 - p);
    };

    /**
     * returns all combination of items in a with at least min element and at
     * most max element
     *
     * @param {Array} a Required.
     * @param {int} min Required.
     * @param {int} max Optional.
     * @returns {Array}
     */
    sbo.combine = function(a, min, max) {
        var fn = function(n, src, got, all) {
            if (n === 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }
            for (var j = 0; j < src.length; j++) {
                fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
            }
            return;
        };
        var all = [];
        for (var i = min; i < a.length; i++) {
            fn(i, a, [], all);
        }
        all.push(a);
        if (angular.isDefined(max)) {
            for (var j = all.length - 1; j >= 0; --j) {
                if (all[j].length > max) {
                    all.splice(j, 1);
                }
            }
        }
        return all;
    };

    return sbo;
});
