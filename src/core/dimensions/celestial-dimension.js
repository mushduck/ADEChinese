import { DC } from "../constants"; 

import { player } from "./player"; 

export const CelestialDimensions = { 
    baseCosts: [DC.D1, DC.E1, DC.E2, DC.E4, DC.E10, DC.E30, DC.E100, DC.E300], 
    costMult: [DC.E3, DC.E4, DC.E5, DC.E6, DC.E8, DC.E10, DC.E12, DC.E15],

    getAmount(tier) { 
        return player.dimensions.celestial[tier].amount; 
    }, 

    getBought(tier) { 
        return player.dimensions.celestial[tier].bought; 
    }, 

    getCost(tier) { 
        return player.dimensions.celestial[tier].cost; 
    }, 

    canBuy(tier) { 
        return player.endgame.celestialPoints.gte(this.getCost(tier)); 
    }, 

    buy(tier) { 
        if (this.canBuy(tier)) { 
            player.endgame.celestialPoints = player.endgame.celestialPoints.sub(this.getCost(tier)); 
            player.dimensions.celestial[tier].bought++; 
            player.dimensions.celestial[tier].cost = player.dimensions.celestial[tier].cost.times(this.costMult); 
            return true; 
        } 
        return false; 
    }, 

    produce(tier) { 
        if (tier === 0) { 
            player.endgame.celestialMatter = player.endgame.celestialMatter.add( 
            this.getAmount(tier) 
        ); 
        } else { 
            player.dimensions.celestial[tier - 1].amount = 
            player.dimensions.celestial[tier - 1].amount.add( 
            this.getAmount(tier) 
        ); 
        } 
    }, 

    tick() { 
        for (let tier = 7; tier >= 0; tier--) { 
        this.produce(tier); 
        } 
    }, 

    reset() { 
        player.celestialDimensions.forEach(dim => { 
        dim.amount = DC.D0; 
        dim.bought = 0;
        dim.cost = this.baseCosts; 
        }); 
        player.endgame.celestialMatter = DC.D0; 
    } 
};
