
export interface UnderlyingFields {
    underlyingTicker: string;
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

export interface ChatMessage {
    text: string;
    type: number; // 0 for user, 1 for bot
}

export class Constants {
    public static UNDERLYING_HEADER = ['Underlying Ticker', 'Description', 'Currency', 'Last Price($)', 'Unadjusted Initial Price($)', 'Adjusted Initial Price($)', 'Current vs Adjusted Initial Price(%)', 'Basket', 'Type', 'ISIN'];
}