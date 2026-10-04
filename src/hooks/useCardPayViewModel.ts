import { useState, useCallback } from 'react';

export interface CardPayState {
  cardHolder: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  sinpePhone: string;
  sinpeSender: string;
  sinpeReference: string;
  ibanAccount: string;
  isProcessing: boolean;
}

/**
 * Hook useCardPayViewModel - Emulador Reactivo de Kotlin MutableStateFlow
 * 
 * Expone un flujo de estado 'stateFlowValue' inmutable para la UI, junto con
 * métodos para emitir nuevos estados (emulando la actualización del `.value` de un StateFlow).
 */
export function useCardPayViewModel() {
  // Inicializado limpio sin datos de simulacro
  const [state, setState] = useState<CardPayState>({
    cardHolder: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    sinpePhone: '',
    sinpeSender: '',
    sinpeReference: '',
    ibanAccount: '',
    isProcessing: false,
  });

  // Emula el método clearToZeroAndEmpty() del ViewModel en Kotlin
  const clearToZeroAndEmpty = useCallback(() => {
    setState({
      cardHolder: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      sinpePhone: '',
      sinpeSender: '',
      sinpeReference: '',
      ibanAccount: '',
      isProcessing: false,
    });
  }, []);

  // Carga los datos precargados reales del inversionista
  const loadPreloadedInvestorProfile = useCallback(() => {
    setState({
      cardHolder: 'USUARIO REGISTRADO',
      cardNumber: '5126 8493 3659 4120',
      cardExpiry: '12/30',
      cardCvc: '777',
      sinpePhone: '8888-7777',
      sinpeSender: 'USUARIO REGISTRADO',
      sinpeReference: '20269948',
      ibanAccount: 'CR19015202230006190432',
      isProcessing: false,
    });
  }, []);

  // Métodos mutadores reactivos (emulan emitir un nuevo valor en el StateFlow)
  const updateCardNumber = useCallback((val: string) => {
    let raw = val.replace(/\s?/g, '').replace(/\D/g, '');
    if (raw.length > 16) raw = raw.substring(0, 16);
    let parts = [];
    for (let i = 0; i < raw.length; i += 4) {
      parts.push(raw.substring(i, i + 4));
    }
    const formatted = parts.join(' ');
    setState(prev => ({ ...prev, cardNumber: formatted }));
  }, []);

  const updateCardHolder = useCallback((val: string) => {
    setState(prev => ({ ...prev, cardHolder: val.toUpperCase() }));
  }, []);

  const updateCardExpiry = useCallback((val: string) => {
    let clean = val.replace(/\//g, '').replace(/\D/g, '');
    if (clean.length > 4) clean = clean.substring(0, 4);
    let expiry = clean;
    if (clean.length > 2) {
      expiry = clean.substring(0, 2) + '/' + clean.substring(2);
    }
    setState(prev => ({ ...prev, cardExpiry: expiry }));
  }, []);

  const updateCardCvc = useCallback((val: string) => {
    const cvc = val.replace(/\D/g, '').substring(0, 4);
    setState(prev => ({ ...prev, cardCvc: cvc }));
  }, []);

  const updateSinpePhone = useCallback((val: string) => {
    setState(prev => ({ ...prev, sinpePhone: val }));
  }, []);

  const updateSinpeSender = useCallback((val: string) => {
    setState(prev => ({ ...prev, sinpeSender: val }));
  }, []);

  const updateSinpeReference = useCallback((val: string) => {
    setState(prev => ({ ...prev, sinpeReference: rawString(val) }));
  }, []);

  const updateIbanAccount = useCallback((val: string) => {
    setState(prev => ({ ...prev, ibanAccount: val }));
  }, []);

  const updateIsProcessing = useCallback((val: boolean) => {
    setState(prev => ({ ...prev, isProcessing: val }));
  }, []);

  return {
    stateFlowValue: state,
    clearToZeroAndEmpty,
    loadPreloadedInvestorProfile,
    updateCardNumber,
    updateCardHolder,
    updateCardExpiry,
    updateCardCvc,
    updateSinpePhone,
    updateSinpeSender,
    updateSinpeReference,
    updateIbanAccount,
    updateIsProcessing,
  };
}

function rawString(val: string): string {
  return val.replace(/\D/g, '');
}
