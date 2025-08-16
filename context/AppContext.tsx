import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface BookingData {
  id: string;
  route: string;
  departureDate: string;
  departureTime: string;
  baseFare: number;
  taxes: number;
  assuredFee: number;
  hasAssuredFee: boolean;
  status: 'draft' | 'booked' | 'changed' | 'cancelled';
}

export interface AppPreferences {
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY';
  timeFormat: '12h' | '24h';
  language: string;
  notifications: {
    bookingConfirmations: boolean;
    tripReminders: boolean;
    priceAlerts: boolean;
  };
}

interface AppState {
  currentBooking: BookingData | null;
  bookingHistory: BookingData[];
  preferences: AppPreferences;
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_BOOKING'; payload: BookingData }
  | { type: 'ADD_ASSURED_FEE' }
  | { type: 'REMOVE_ASSURED_FEE' }
  | { type: 'CANCEL_BOOKING' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppPreferences> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

const initialState: AppState = {
  currentBooking: {
    id: 'booking-001',
    route: 'New York → Boston',
    departureDate: '2024-12-15',
    departureTime: '10:00 AM',
    baseFare: 89,
    taxes: 15,
    assuredFee: 25,
    hasAssuredFee: false,
    status: 'draft',
  },
  bookingHistory: [],
  preferences: {
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'en',
    notifications: {
      bookingConfirmations: true,
      tripReminders: true,
      priceAlerts: false,
    },
  },
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_BOOKING':
      return {
        ...state,
        currentBooking: action.payload,
      };
    case 'ADD_ASSURED_FEE':
      return {
        ...state,
        currentBooking: state.currentBooking
          ? { ...state.currentBooking, hasAssuredFee: true }
          : null,
      };
    case 'REMOVE_ASSURED_FEE':
      return {
        ...state,
        currentBooking: state.currentBooking
          ? { ...state.currentBooking, hasAssuredFee: false }
          : null,
      };
    case 'CANCEL_BOOKING':
      return {
        ...state,
        currentBooking: state.currentBooking
          ? { ...state.currentBooking, status: 'cancelled' }
          : null,
        bookingHistory: state.currentBooking
          ? [...state.bookingHistory, { ...state.currentBooking, status: 'cancelled' }]
          : state.bookingHistory,
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
  calculateRefund: () => { amount: number; breakdown: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const formatCurrency = (amount: number): string => {
    const { currency } = state.preferences;
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
    };
    return `${currencySymbols[currency]}${amount}`;
  };

  const formatDate = (date: string): string => {
    const { dateFormat } = state.preferences;
    const dateObj = new Date(date);
    if (dateFormat === 'DD/MM/YYYY') {
      return dateObj.toLocaleDateString('en-GB');
    }
    return dateObj.toLocaleDateString('en-US');
  };

  const calculateRefund = () => {
    if (!state.currentBooking) {
      return { amount: 0, breakdown: 'No booking found' };
    }

    const { baseFare, taxes, hasAssuredFee } = state.currentBooking;
    
    if (hasAssuredFee) {
      return {
        amount: baseFare + taxes,
        breakdown: `Full refund of fare (${formatCurrency(baseFare)}) + taxes (${formatCurrency(taxes)})`,
      };
    } else {
      const cancellationFee = 15;
      return {
        amount: baseFare + taxes - cancellationFee,
        breakdown: `Fare (${formatCurrency(baseFare)}) + taxes (${formatCurrency(taxes)}) - cancellation fee (${formatCurrency(cancellationFee)})`,
      };
    }
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    formatCurrency,
    formatDate,
    calculateRefund,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}