
export interface UnderlyingFields {
    underlyingTracker: string;
    description: string;
    currency: string;
    lastPrice: number;
    unadjustedInitialPrice: number;
    adjustedInitialPrice: number;
    currentVsadjustedInitialPrice: string;
    basket: string;
    type: string;
    isin: string;
}


export interface BaarierMonitoringFields {
    putStrke: number | string;
    autocall: number | string;
    couponBarrier: number | string;
    digitalCoupon: number | string;
    upsideUpperBarrier: number | string;
    upsideLowerBarrier: number | string;
    downsideBarrier: number | string;
    callStrike: number | string;
    cap: number | string;
    floor: number | string;
}