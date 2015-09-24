'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resTbEventName
 * @description
 * # resTbEventName
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RTBEventName', function() {
    // Service logic

    var names = {
        "achive-1" : 'achive-1',
        "achive-2" : 'achive-2',
        "achive-3" : 'achive-3',
        "achive-4" : 'achive-4',
        "achive-5" : 'achive-5',
        "achivements_enable" : 'achivements_enable',
        
        "ch_2004-1-flag1" : 'ch_2004-1-flag1',
        "ch_2004-1-flag2" : 'ch_2004-1-flag2',
        "ch_2004-1-flag3" : 'ch_2004-1-flag3',
        "ch_3002_stamina_half" : 'CC in the Arena + 1/2 stamina cost',
        
        "comeback_campaign_enabled" : 'comeback_campaign_enabled',
        
        "consecutive_login_campaign_enabled" : '2x Consecutive Login Bonus Special Event',
        "coop_prize" : 'coop_prize',
        
        "disableCheckDailyQuestCheat" : 'disableCheckDailyQuestCheat',
        "DisableEnterGiftCode_v3_0_0" : 'DisableEnterGiftCode_v3_0_0',
        "EnableBuddy" : 'EnableBuddy',
        "enableDailyBonus" : 'enableDailyBonus',
        "enableDailyQuest" : 'enableDailyQuest',
        "EnableFriendInvite" : 'EnableFriendInvite',
        "EnableLiveMusic" : 'EnableLiveMusic',
        "enableWeeklyChallenge" : 'enableWeeklyChallenge',
        
        "everydayenergy_enabled" : 'Daily Energy Giveaway',
        
        "main_quest_stamina_half" : 'Main Quest Half Stamina Event',
        
        "multiplay_enable" : 'multiplay_enable',
        "multiplay_mainquest_enable" : 'multiplay_mainquest_enable',
        "multiplay_stamina_half" : 'Eidolons 1/2 Stamina Campaign',
        "multiplay_stamina_zero" : 'Eidolons 0 Stamina Campaign',
        
        "buddy_always_exp_bonus" : '【Companions of Truth】 Guaranteed XP bonus',
        "buddy_slot_event_gold_2x" : '【Companions of Truth】 2x Rates for an S-Class or Higher Companion',
        "buddy_slot_event_gold_for_10" : 'buddy_slot_event_gold_for_10',
        "buddy_slot_event_help_item_present" : 'buddy_slot_event_help_item_present',
        "buddy_slot_event_mticket_present" : '【Companions of Truth】 Metal Ticket Giveaway',
        
        "slot_event_2_gold_for_10" : '【Pact of Truth】 2 Gold or higher guaranteed',
        "slot_event_all_plus" : '【Pact of Truth】 "+ Pact" Special Event',
        "slot_event_desc_en" : 'slot_event_desc_en',
        "slot_event_desc_ja" : 'slot_event_desc_ja',
        "slot_event_help_item_present" : '【Pact of Truth】 Power-up Item Giveaway',
        "slot_event_mticket_present" : '【Pact of Truth】 Metal Ticket Special Event',
        "slot_event_ratio_up" : 'slot_event_ratio_up',
        
        // Descend
        "sp_ch_2000-1" : 'Bahamut 1 in Arena',
        "sp_ch_2000-2" : 'Bahamut 2 in Arena',
        "sp_ch_2000-3" : 'Bahamut 3 in Arena',
        "sp_ch_2001-1" : 'Leviathan 1 in Arena',
        "sp_ch_2001-2" : 'Leviathan 2 in Arena',
        "sp_ch_2001-3" : 'Leviathan 3 in Arena',
        "sp_ch_2002-1" : 'Odin 1 in Arena',
        "sp_ch_2002-2" : 'Odin 2 in Arena',
        "sp_ch_2002-3" : 'Odin 3 in Arena',
        "sp_ch_2003-1" : 'The Last Story in Arena',
        "sp_ch_2004-1" : 'Jade Dragon in Arena',
        
        // MZ
        "sp_ch_3000-1" : 'MZ1 in Arena',
        "sp_ch_3000-2" : 'MZ2 in Arena',
        "sp_ch_3000-3" : 'MZ3 in Arena',
        "sp_ch_3000-4" : 'MZ4 in Arena',
        "sp_ch_3000-5" : 'MZ5 in Arena',
        "sp_ch_3000-6" : 'MZ6 in Arena',
        "sp_ch_3000-11" : 'MZK1 in Arena',
        "sp_ch_3000-12" : 'MZK2 in Arena',
        "sp_ch_3000-13" : 'MZK3 in Arena',
        "sp_ch_3000-14" : 'MZK4 in Arena',
        "sp_ch_3000-15" : 'MZK5 in Arena',
        "sp_ch_3000-16" : 'MZK6 in Arena',
        
        "sp_ch_3001-1" : 'Gormandizer at the Arena!',
        "sp_ch_3002-1" : 'CC1 in Arena',
        "sp_ch_3002-2" : 'CC2 in Arena',
        "sp_ch_3002-3" : 'CC3 in Arena',
        
        // Coop
        "mp_ch_4000-1" : 'Artemis in Arena',
        "mp_ch_4001-1" : 'Chaos in Arena',
        "mp_ch_4002-1" : 'Valkyrie in Arena',
        "mp_ch_4003-1" : 'Lamia in Arena',
        "mp_ch_4004-1" : 'Chaos in Arena',
        
        // Vs
        "mp_ch_5000-1" : 'mp_ch_5000-1',
        "mp_ch_5001-1" : 'mp_ch_5001-1',
        "mp_ch_5002-1" : 'mp_ch_5002-1',
        "mp_ch_5003-1" : 'mp_ch_5003-1',
        "mp_ch_5004-1" : 'mp_ch_5004-1',
        "mp_ch_5005-1" : 'mp_ch_5005-1',
        "mp_ch_5500-1" : 'mp_ch_5500-1',
        "mp_ch_5501-1" : 'mp_ch_5501-1',
        "mp_ch_5502-1" : 'mp_ch_5502-1',
        "mp_ch_5503-1" : 'mp_ch_5503-1',
        "mp_ch_5504-1" : 'mp_ch_5504-1',
        "mp_ch_5505-1" : 'mp_ch_5505-1',
        "mp_ch_5999-1" : 'mp_ch_5999-1',
        
        "summon_enable" : 'summon_enable',
        "survey-1" : 'survey-1',
        "tutorial_get_named_healer" : 'Kuscah as starter Healer',
        "use_another_bgm_for_hunting" : 'use_another_bgm_for_hunting',
        "use_sakaba_bgm_for_bar" : 'use_sakaba_bgm_for_bar',
        "UseLiveMusicAsDefault" : 'UseLiveMusicAsDefault',
        "vs_enable" : 'vs_enable',
        "vs_friend_enable" : 'vs_friend_enable',
        "vs_honban" : 'vs_honban',
        "vs_normal_enable" : 'vs_normal_enable',
        "vs_stamina_half" : 'vs_stamina_half',
        "vs_stamina_zero" : 'vs_stamina_zero'
    };

    // Public API here
    return {
        getNameForKey : function(key) {
            return names[key] || 'Unknown event';
        }
    };
});
