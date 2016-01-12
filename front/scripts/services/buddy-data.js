'use strict';

/**
 * @ngdoc service
 * @name tbsApp.buddyData
 * @description
 * # buddyData
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('BuddyData', function(InGame) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var bd = {
        GetParamAtLevel: function(name, level, min, max, coeff){
            if (level < 1) { level = 1; }
            var num = (level - 1) / parseFloat(98);
            var num2 = (InGame.ChrJobParams_MaxLevel != 1) ? ((level - 1) / parseFloat(InGame.ChrJobParams_MaxLevel - 1)) : 0;
            
            switch(name){
                case 'ATK':
                    return Math.floor (min + parseFloat(max - min) * Math.pow (num2, coeff));
                case 'DEF':
                    return Math.floor (min + parseFloat(max - min) * Math.pow (num2, coeff));
                case 'EXP':
                    return Math.floor(parseFloat(max) * Math.pow(num, coeff));
                
            }
            //buddyParam.SATK = Mathf.FloorToInt ((float)this.SATKmin + (float)(this.SATKmax - this.SATKmin) * Mathf.Pow (num2, this.Coeff));
            //buddyParam.SDEF = Mathf.FloorToInt ((float)this.SDEFmin + (float)(this.SDEFmax - this.SDEFmin) * Mathf.Pow (num2, this.Coeff));
            //buddyParam.BOOST = Mathf.FloorToInt ((float)this.BOOSTmin + (float)(this.BOOSTmax - this.BOOSTmin) * Mathf.Pow (num2, this.Coeff));
        }
    };
    return bd;
});
