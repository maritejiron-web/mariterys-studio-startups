import React, { useState, useEffect } from 'react';
import { useCardPayViewModel } from '../hooks/useCardPayViewModel';
import { 
  Coins, 
  Wallet, 
  TrendingUp, 
  Calculator, 
  Cpu, 
  FileSpreadsheet, 
  ShieldAlert, 
  RefreshCw, 
  ArrowRightLeft, 
  Send, 
  CheckCircle, 
  XCircle, 
  Terminal, 
  Layers, 
  Info,
  DollarSign,
  Briefcase,
  Bot,
  Sparkles,
  Crown
} from 'lucide-react';
import { FintechExecutiveBot } from './FinTech/FintechExecutiveBot';
import { FintechAcquisitionModal } from './FinTech/FintechAcquisitionModal';

// Amortization Row Type
interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  amortization: number;
  balance: number;
}

// Ledger Transaction Type
interface LedgerTx {
  id: string;
  timestamp: string;
  type: 'DEPOSITO' | 'CONVERSION' | 'DESEMBOLSO_PRESTAMO' | 'PAGO_CUOTA';
  currency: 'CRC' | 'USD' | 'EUR';
  amount: number;
  debitAccount: string;
  creditAccount: string;
  status: 'PROCESANDO' | 'APROBADO_LEDGER' | 'CONCILIADO_SINPE' | 'RECHAZADO';
  txHash: string;
}

// Real Customer / Credit Bureau Profile
interface CustomerProfile {
  id: string;
  cedula?: string;
  name: string;
  monthlyIncome: number;
  currentDebts: number;
  creditScore: number;
  nationality: string;
  routingIBAN: string;
  cardSINPE?: string;
  stateBankDebts: number;       // Deudas en Bancos del Estado (CRC)
  otherBankDelinquency: boolean; // ¿Tiene morosidad activa?
  delinquencyDays: number;      // Días de atraso
  sugefCategory: 'A1' | 'A2' | 'B' | 'C' | 'D'; // Clasificación de riesgo SUGEF
  debtDetails?: string;         // Historial detallado
}

const STORAGE_KEY_REAL_CUSTOMERS = 'cardpay_fintech_real_customers_clean_v1';

const EMPTY_INITIAL_PROFILE: CustomerProfile = {
  id: 'sin-seleccion',
  cedula: '',
  name: 'Sin persona seleccionada (Consulta un nombre o cédula real)',
  monthlyIncome: 0,
  currentDebts: 0,
  creditScore: 750,
  nationality: 'Costa Rica',
  routingIBAN: '',
  cardSINPE: '',
  stateBankDebts: 0,
  otherBankDelinquency: false,
  delinquencyDays: 0,
  sugefCategory: 'A1',
  debtDetails: 'Base de datos limpia sin datos de simulacro. Ingresa el nombre completo o número de cédula de una persona real para consultar su expediente.'
};

interface FintechSimulatorProps {
  onBackToHub?: () => void;
}

export default function FintechSimulator({ onBackToHub }: FintechSimulatorProps = {}) {
  // Instanciar el ViewModel de Tarjeta de forma reactiva (emula StateFlow)
  const cardPayViewModel = useCardPayViewModel();

  // Customers List State (Base de datos limpia de personas reales persistida en localStorage)
  const [customersList, setCustomersList] = useState<CustomerProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REAL_CUSTOMERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Guardar automáticamente en localStorage cada vez que se agregue o elimine una persona real
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REAL_CUSTOMERS, JSON.stringify(customersList));
    } catch {}
  }, [customersList]);

  // Simulator Active Tab
  const [activeSubTab, setActiveSubTab] = useState<'wallets' | 'calculator' | 'risk' | 'api' | 'ledger' | 'database' | 'viewmodel' | 'ai_executive'>('database');

  // Customer State
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile>(() => {
    return customersList.length > 0 ? customersList[0] : EMPTY_INITIAL_PROFILE;
  });

  // Wallet Balances State (Simulated Savings)
  const [balances, setBalances] = useState({
    CRC: 500000, // Colones
    USD: 1200,   // Dólares
    EUR: 850     // Euros
  });

  // Exchange Rates (Base CRC)
  const exchangeRates = {
    USD_CRC: 512, // 1 USD = 512 CRC
    EUR_CRC: 556, // 1 EUR = 556 CRC
    USD_EUR: 0.92 // 1 USD = 0.92 EUR
  };

  // Convert states
  const [convertFrom, setConvertFrom] = useState<'CRC' | 'USD' | 'EUR'>('CRC');
  const [convertTo, setConvertTo] = useState<'CRC' | 'USD' | 'EUR'>('USD');
  const [convertAmount, setConvertAmount] = useState<number>(50000);
  const [swapFeedback, setSwapFeedback] = useState<string | null>(null);

  // Loan Settings State
  const [loanAmount, setLoanAmount] = useState<number>(1500000); // 1.5M CRC
  const [loanCurrency, setLoanCurrency] = useState<'CRC' | 'USD' | 'EUR'>('CRC');
  const [interestRate, setInterestRate] = useState<number>(14.5); // 14.5% annual
  const [loanTerm, setLoanTerm] = useState<number>(24); // 24 months
  const [amortizationSystem, setAmortizationSystem] = useState<'french' | 'german'>('french');
  const [isAcquisitionModalOpen, setIsAcquisitionModalOpen] = useState<boolean>(false);

  // GitHub Export Assistant States
  const [isGithubPanelOpen, setIsGithubPanelOpen] = useState<boolean>(false);
  const [ghToken, setGhToken] = useState<string>('');
  const [ghRepoName, setGhRepoName] = useState<string>('mariterys-studio-startups');
  const [ghIsPushing, setGhIsPushing] = useState<boolean>(false);
  const [ghFeedback, setGhFeedback] = useState<{ ok: boolean; msg: string; url?: string } | null>(null);

  const handlePushStartupsToGithub = async () => {
    if (!ghToken.trim()) {
      setGhFeedback({
        ok: false,
        msg: '⚠️ Por favor pega tu Token Personal de GitHub (empieza con ghp_ o github_pat_) o usa el botón de GitHub arriba a la derecha de AI Studio.'
      });
      return;
    }
    setGhIsPushing(true);
    setGhFeedback({ ok: true, msg: '🛰️ Conectando con tu cuenta de GitHub y subiendo tus 6 Startups...' });
    try {
      const res = await fetch('/api/github/push-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: ghToken.trim(),
          repoName: ghRepoName.trim() || 'mariterys-studio-startups',
          isPrivate: false
        })
      });
      const data = await res.json();
      if (data && data.success) {
        setGhFeedback({
          ok: true,
          msg: `✅ ¡ÉXITO TOTAL! Se subieron ${data.filesCount} archivos de tus 6 Startups a tu repositorio oficial de GitHub.`,
          url: data.repoUrl
        });
      } else {
        setGhFeedback({
          ok: false,
          msg: `❌ ${data?.error || 'No se pudo subir a GitHub. Verifica tu token.'}`
        });
      }
    } catch {
      setGhFeedback({
        ok: false,
        msg: '❌ Error de red al conectar con GitHub. Intenta nuevamente.'
      });
    } finally {
      setGhIsPushing(false);
    }
  };

  // Risk Scoring and AML inputs (derived initially from selected customer, can be manual)
  const [monthlyIncome, setMonthlyIncome] = useState<number>(selectedCustomer.monthlyIncome);
  const [existingDebts, setExistingDebts] = useState<number>(selectedCustomer.currentDebts);
  const [creditBureauScore, setCreditBureauScore] = useState<number>(selectedCustomer.creditScore);
  const [clientNationality, setClientNationality] = useState<string>(selectedCustomer.nationality);

  // Sync inputs with selected customer
  useEffect(() => {
    setMonthlyIncome(selectedCustomer.monthlyIncome);
    setExistingDebts(selectedCustomer.currentDebts);
    setCreditBureauScore(selectedCustomer.creditScore);
    setClientNationality(selectedCustomer.nationality);

    // Sync to CardPayViewModel reactive state flow
    const isCleanEmpty = selectedCustomer.id === 'sin-seleccion';
    cardPayViewModel.updateCardHolder(isCleanEmpty ? '' : selectedCustomer.name);
    cardPayViewModel.updateCardNumber(selectedCustomer.cardSINPE || '');
    cardPayViewModel.updateIbanAccount(selectedCustomer.routingIBAN || '');
    cardPayViewModel.updateSinpePhone('');
    cardPayViewModel.updateSinpeSender(isCleanEmpty ? '' : selectedCustomer.name);
  }, [selectedCustomer]);

  // Amortization Table state
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [totals, setTotals] = useState({ totalPayment: 0, totalInterest: 0, monthlyPaymentBase: 0 });

  // Risk Scoring Results
  const [riskAssessment, setRiskAssessment] = useState<{
    score: number;
    dtiRatio: number;
    isDtiOk: boolean;
    isScoreOk: boolean;
    isAmlOk: boolean;
    amlReasons: string[];
    decision: 'APROBADO' | 'REVISION_MANUAL' | 'RECHAZADO';
    maxLoanSuggested: number;
  }>({ score: 100, dtiRatio: 0, isDtiOk: true, isScoreOk: true, isAmlOk: true, amlReasons: [], decision: 'APROBADO', maxLoanSuggested: 5000000 });

  // STATE FOR CUSTOMER DATABASE SEARCH & REGISTRATION
  const [dbSearchQuery, setDbSearchQuery] = useState<string>('');
  const [dbFilterStatus, setDbFilterStatus] = useState<'TODOS' | 'AL_DIA' | 'CON_MORA'>('TODOS');

  // New customer form states + Consulta en Vivo por Cédula (Ministerio de Hacienda / TSE)
  const [formCedula, setFormCedula] = useState<string>('');
  const [isConsultingCedula, setIsConsultingCedula] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formIncome, setFormIncome] = useState<number>(950000);
  const [formDebts, setFormDebts] = useState<number>(0);
  const [formScore, setFormScore] = useState<number>(750);
  const [formNationality, setFormNationality] = useState<string>('Costa Rica');
  const [formIBAN, setFormIBAN] = useState<string>('CR05015202001000000000');
  const [formCard, setFormCard] = useState<string>('');
  const [formStateDebts, setFormStateDebts] = useState<number>(0);
  const [formDelinquency, setFormDelinquency] = useState<boolean>(false);
  const [formDelinquencyDays, setFormDelinquencyDays] = useState<number>(0);
  const [formSugefCategory, setFormSugefCategory] = useState<'A1' | 'A2' | 'B' | 'C' | 'D'>('A1');
  const [formDebtDetails, setFormDebtDetails] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [haciendaMatches, setHaciendaMatches] = useState<Array<{ cedula: string; fullname: string }>>([]);

  // Consultar detalle oficial (Padrón TSE + Ministerio de Hacienda CR) por Cédula o Nombre
  const applyLookupPersonResult = (person: {
    cedula: string;
    name: string;
    moroso: string;
    omiso: string;
    estadoTributario: string;
    administracionTributaria: string;
    regimen: string;
    actividades: string;
  }) => {
    const isMorosoHacienda = person.moroso === 'SI';
    const isOmisoHacienda = person.omiso === 'SI';
    const sugefCat: 'A1' | 'A2' | 'B' | 'C' | 'D' = isMorosoHacienda ? 'C' : isOmisoHacienda ? 'B' : 'A1';
    const calcScore = isMorosoHacienda ? 540 : isOmisoHacienda ? 630 : 795;
    const delinqDays = isMorosoHacienda ? 60 : isOmisoHacienda ? 30 : 0;

    const summaryNote = `Verificación Oficial TSE & Hacienda CR (Cédula ${person.cedula}): Estado "${person.estadoTributario}" (${person.administracionTributaria}) · Régimen: ${person.regimen} · Moroso en Hacienda: ${person.moroso} · Omiso: ${person.omiso} · Actividades: ${person.actividades}.`;

    setFormCedula(person.cedula);
    setFormName(person.name);
    setFormDelinquency(isMorosoHacienda || isOmisoHacienda);
    setFormDelinquencyDays(delinqDays);
    setFormSugefCategory(sugefCat);
    setFormScore(calcScore);
    setFormDebtDetails(summaryNote);

    const autoProfile: CustomerProfile = {
      id: `ced-${person.cedula}`,
      cedula: person.cedula,
      name: person.name,
      monthlyIncome: formIncome,
      currentDebts: formDebts,
      creditScore: calcScore,
      nationality: formNationality.trim() || 'Costa Rica',
      routingIBAN: formIBAN.trim() || 'CR05015202001000000000',
      cardSINPE: formCard.trim() || undefined,
      stateBankDebts: formStateDebts,
      otherBankDelinquency: isMorosoHacienda || isOmisoHacienda,
      delinquencyDays: delinqDays,
      sugefCategory: sugefCat,
      debtDetails: summaryNote
    };

    setCustomersList((prev) => [autoProfile, ...prev.filter((c) => c.id !== autoProfile.id)]);
    setSelectedCustomer(autoProfile);
  };

  const fetchAndPopulateByCedula = async (cleanCedula: string, fallbackName?: string) => {
    setIsConsultingCedula(true);
    setFormMessage(`🛰️ Consultando expediente oficial de Cédula ${cleanCedula} en Padrón TSE y Ministerio de Hacienda...`);

    try {
      const response = await fetch(`/api/fintech/bureau-lookup?cedula=${encodeURIComponent(cleanCedula)}&q=${encodeURIComponent(fallbackName || cleanCedula)}`);
      const data = await response.json();

      if (data && data.found && data.person) {
        applyLookupPersonResult(data.person);
        setFormMessage(
          `✅ ¡Persona Real Encontrada! "${data.person.name}" (Cédula: ${data.person.cedula}) — Moroso en Hacienda: ${data.person.moroso} · Omiso: ${data.person.omiso}. Expediente cargado en el Reporte del Buró a la derecha.`
        );
        return;
      }
      throw new Error(data?.message || 'No encontrado');
    } catch {
      if (fallbackName) {
        setFormCedula(cleanCedula);
        setFormName(fallbackName);
        setFormMessage(`ℹ️ Se seleccionó a "${fallbackName}" (Cédula ${cleanCedula}). Presiona el botón amarillo abajo para guardarlo.`);
      } else {
        setFormMessage('ℹ️ No se encontró registro para esa cédula. Verifica los 9 dígitos o escribe el nombre completo.');
      }
    } finally {
      setIsConsultingCedula(false);
    }
  };

  // Consultar Persona Real en Vivo por NOMBRE COMPLETO o por CÉDULA en Padrón TSE + Hacienda CR
  const handleLookupRealPerson = async (overrideQuery?: string) => {
    const rawInput = (overrideQuery ?? (formCedula.trim() || formName.trim())).trim();
    if (!rawInput) {
      setFormMessage('⚠️ Escribe el Nombre y Apellidos de una persona real (ej: María Teresa Jirón) o los 9 dígitos de su Cédula.');
      return;
    }

    setIsConsultingCedula(true);
    setHaciendaMatches([]);
    setFormMessage(`🛰️ Buscando a "${rawInput}" en tiempo real en el Padrón del TSE y Ministerio de Hacienda de Costa Rica...`);

    try {
      const response = await fetch(`/api/fintech/bureau-lookup?q=${encodeURIComponent(rawInput)}`);
      const data = await response.json();

      if (data && data.found && data.person) {
        const matchesList = Array.isArray(data.matches) ? data.matches : [];
        setHaciendaMatches(matchesList);
        applyLookupPersonResult(data.person);

        if (matchesList.length > 1) {
          setFormMessage(
            `✅ ¡Encontrado! Se encontraron ${matchesList.length} personas reales en el Padrón TSE para "${rawInput}". Se cargó a "${data.person.name}" (Cédula: ${data.person.cedula}, Moroso Hacienda: ${data.person.moroso}). Si buscas a otra homónima, selecciónala abajo.`
          );
        } else {
          setFormMessage(
            `✅ ¡Persona Real Verificada en TSE y Hacienda! "${data.person.name}" (Cédula: ${data.person.cedula}) — Moroso en Hacienda: ${data.person.moroso} · Omiso: ${data.person.omiso}. Ya está cargada en el Reporte del Buró a la derecha.`
          );
        }
      } else {
        setFormMessage(
          data?.message ||
            `ℹ️ "${rawInput}" no aparece en el Padrón Electoral de Costa Rica. Si es extranjera o deseas evaluarla manualmente, llena su nombre abajo y presiona el botón amarillo.`
        );
      }
    } catch {
      setFormMessage(
        `ℹ️ Error de red al consultar "${rawInput}". Intenta de nuevo o registra los datos manualmente abajo.`
      );
    } finally {
      setIsConsultingCedula(false);
    }
  };

  // Eliminar un registro del directorio
  const handleDeleteCustomer = (idToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomersList((prev) => {
      const updated = prev.filter((c) => c.id !== idToRemove);
      if (selectedCustomer.id === idToRemove) {
        setSelectedCustomer(updated.length > 0 ? updated[0] : EMPTY_INITIAL_PROFILE);
      }
      return updated;
    });
  };

  // Helper to handle registration of real people
  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetNameOrQuery = formName.trim() || formCedula.trim();
    if (!targetNameOrQuery) {
      setFormMessage('❌ Ingresa el nombre completo o número de cédula de la persona.');
      return;
    }

    let cleanCed = formCedula.replace(/[^0-9]/g, '');
    let resolvedName = formName.trim() || formCedula.trim();
    let resolvedDelinquency = formDelinquency;
    let resolvedDelinquencyDays = formDelinquency ? formDelinquencyDays : 0;
    let resolvedSugef = formSugefCategory;
    let resolvedScore = formScore;
    let resolvedDetails = formDebtDetails.trim();

    // Si aún no tiene cédula verificada de 9 dígitos, consultar automáticamente en Padrón TSE y Hacienda antes de guardar
    if (cleanCed.length < 9) {
      setIsConsultingCedula(true);
      setFormMessage(`🛰️ Consultando a "${targetNameOrQuery}" en el Padrón Oficial del TSE y Hacienda...`);
      try {
        const res = await fetch(`/api/fintech/bureau-lookup?q=${encodeURIComponent(targetNameOrQuery)}`);
        const data = await res.json();
        if (data && data.found && data.person) {
          cleanCed = data.person.cedula;
          resolvedName = data.person.name;
          const isMorosoHacienda = data.person.moroso === 'SI';
          const isOmisoHacienda = data.person.omiso === 'SI';
          if (isMorosoHacienda || isOmisoHacienda) {
            resolvedDelinquency = true;
            resolvedDelinquencyDays = isMorosoHacienda ? 60 : 30;
            resolvedSugef = isMorosoHacienda ? 'C' : 'B';
            resolvedScore = isMorosoHacienda ? 540 : 630;
          }
          if (!resolvedDetails) {
            resolvedDetails = `Verificación Oficial TSE & Hacienda CR (Cédula ${data.person.cedula}): Estado "${data.person.estadoTributario}" (${data.person.administracionTributaria}) · Régimen: ${data.person.regimen} · Moroso en Hacienda: ${data.person.moroso} · Omiso: ${data.person.omiso} · Actividades: ${data.person.actividades}.`;
          }
          if (Array.isArray(data.matches)) {
            setHaciendaMatches(data.matches);
          }
        }
      } catch {
        // Fallback to manual entry if offline
      } finally {
        setIsConsultingCedula(false);
      }
    }

    const finalCedula = cleanCed || 'No registrada en TSE';
    const randomId = cleanCed ? `ced-${cleanCed}` : `real-${Date.now()}`;
    const cleanIban = formIBAN.trim() || 'CR05015202001000000000';

    const newCust: CustomerProfile = {
      id: randomId,
      cedula: finalCedula,
      name: resolvedName,
      monthlyIncome: formIncome,
      currentDebts: formDebts,
      creditScore: resolvedScore,
      nationality: formNationality.trim() || 'Costa Rica',
      routingIBAN: cleanIban,
      cardSINPE: formCard.trim() || undefined,
      stateBankDebts: formStateDebts,
      otherBankDelinquency: resolvedDelinquency,
      delinquencyDays: resolvedDelinquency ? resolvedDelinquencyDays : 0,
      sugefCategory: resolvedSugef,
      debtDetails:
        resolvedDetails ||
        (formStateDebts > 0
          ? `Deudas bancarias reportadas por ₡${formStateDebts.toLocaleString()} CRC.`
          : 'Expediente registrado sin morosidad ni deudas bancarias reportadas.')
    };

    setCustomersList((prev) => [newCust, ...prev.filter((c) => c.id !== randomId)]);
    setSelectedCustomer(newCust); // Set as active in simulator
    setFormMessage(
      `🟢 ¡Expediente real de "${resolvedName}" (Cédula: ${finalCedula}) verificado y cargado en el Reporte del Buró a la derecha!`
    );

    // Clear form fields
    setFormCedula('');
    setFormName('');
    setFormCard('');
    setFormDebtDetails('');
    setFormStateDebts(0);
    setFormDelinquency(false);
    setFormDelinquencyDays(0);
    setFormSugefCategory('A1');
  };

  // Interbank Routing API Simulator state
  const [apiNetwork, setApiNetwork] = useState<'SINPE' | 'SEPA' | 'FEDWIRE'>('SINPE');
  const [apiWebhookSecret, setApiWebhookSecret] = useState<string>('wh_secret_fintech_secure_90192');
  const [apiPayload, setApiPayload] = useState<string>('');
  const [apiPayloadFormat, setApiPayloadFormat] = useState<'json' | 'xml'>('json');
  const [apiSignature, setApiSignature] = useState<string>('');
  const [routingTerminalLogs, setRoutingTerminalLogs] = useState<string[]>([]);
  const [isRoutingRunning, setIsRoutingRunning] = useState<boolean>(false);
  const [routingProgress, setRoutingProgress] = useState<number>(0);
  const [disbursementSuccess, setDisbursementSuccess] = useState<boolean | null>(null);

  // Ledger state (limpio sin transacciones de simulacro)
  const [ledgerLogs, setLedgerLogs] = useState<LedgerTx[]>([]);

  // Recalculate Loan Amortization
  useEffect(() => {
    calculateAmortization();
  }, [loanAmount, loanCurrency, interestRate, loanTerm, amortizationSystem]);

  // Recalculate Risk Scoring
  useEffect(() => {
    runRiskScoring();
  }, [monthlyIncome, existingDebts, creditBureauScore, clientNationality, loanAmount, loanCurrency, totals.monthlyPaymentBase]);

  // Handle selected network change
  useEffect(() => {
    if (loanCurrency === 'USD') setApiNetwork('FEDWIRE');
    else if (loanCurrency === 'EUR') setApiNetwork('SEPA');
    else setApiNetwork('SINPE');
  }, [loanCurrency]);

  // Live generate API Payload
  useEffect(() => {
    generateMockApiPayload();
  }, [selectedCustomer, loanAmount, loanCurrency, apiNetwork, apiPayloadFormat]);

  // Pure mathematical algorithms for loan amortization
  const calculateAmortization = () => {
    const principal = loanAmount;
    const annualRateFraction = interestRate / 100;
    const monthlyRate = annualRateFraction / 12;
    const months = loanTerm;

    if (principal <= 0 || annualRateFraction <= 0 || months <= 0) return;

    let schedule: AmortizationRow[] = [];
    let totalPayment = 0;
    let totalInterest = 0;
    let monthlyPaymentBase = 0;

    if (amortizationSystem === 'french') {
      // SISTEMA FRANCÉS: Cuota fija mensual
      // Cuota = (P * r) / (1 - (1+r)^-n)
      const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      monthlyPaymentBase = monthlyPayment;

      let balance = principal;
      for (let i = 1; i <= months; i++) {
        const interest = balance * monthlyRate;
        const amortization = monthlyPayment - interest;
        balance -= amortization;
        
        schedule.push({
          month: i,
          payment: monthlyPayment,
          interest: interest,
          amortization: amortization,
          balance: Math.max(0, balance)
        });
        totalPayment += monthlyPayment;
        totalInterest += interest;
      }
    } else {
      // SISTEMA ALEMÁN: Amortización de capital constante
      // Amortización = P / n
      // Interés = Balance_anterior * r
      // Cuota = Amortización + Interés
      const constAmortization = principal / months;
      let balance = principal;

      for (let i = 1; i <= months; i++) {
        const interest = balance * monthlyRate;
        const payment = constAmortization + interest;
        if (i === 1) {
          monthlyPaymentBase = payment; // Cuota máxima inicial
        }
        balance -= constAmortization;

        schedule.push({
          month: i,
          payment: payment,
          interest: interest,
          amortization: constAmortization,
          balance: Math.max(0, balance)
        });
        totalPayment += payment;
        totalInterest += interest;
      }
    }

    setAmortizationSchedule(schedule);
    setTotals({
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      monthlyPaymentBase: Math.round(monthlyPaymentBase)
    });
  };

  // Algoritmo de Scoring de Riesgo y Heurística AML
  const runRiskScoring = () => {
    // 1. Convert proposed quota to CRC for uniform comparison
    let quotaInCRC = totals.monthlyPaymentBase;
    if (loanCurrency === 'USD') quotaInCRC = totals.monthlyPaymentBase * exchangeRates.USD_CRC;
    else if (loanCurrency === 'EUR') quotaInCRC = totals.monthlyPaymentBase * exchangeRates.EUR_CRC;

    // Convert loan amount to CRC
    let amountInCRC = loanAmount;
    if (loanCurrency === 'USD') amountInCRC = loanAmount * exchangeRates.USD_CRC;
    else if (loanCurrency === 'EUR') amountInCRC = loanAmount * exchangeRates.EUR_CRC;

    // Incorporate simulated state bank debts
    const stateDebtsNum = selectedCustomer.stateBankDebts || 0;
    const totalEffectiveDebts = existingDebts + stateDebtsNum;

    // 2. Debt-to-Income (DTI) ratio
    // DTI = (Existing Debts + Proposed Quota) / Monthly Income
    const totalMonthlyCommitment = totalEffectiveDebts + quotaInCRC;
    const dtiRatio = monthlyIncome > 0 ? (totalMonthlyCommitment / monthlyIncome) : 1;
    const isDtiOk = dtiRatio <= 0.40; // Saludable si compromete <= 40% del ingreso

    // 3. Credit Score Rank
    const isScoreOk = creditBureauScore >= 620 && !selectedCustomer.otherBankDelinquency;

    // 4. AML Compliance Check (Heurísticas Antilavado) y Central de Deudas
    const amlReasons: string[] = [];
    let isAmlOk = true;

    // Alerta de morosidad activa en otros bancos del estado / privados
    if (selectedCustomer.otherBankDelinquency) {
      amlReasons.push(`ALERTA MOROSIDAD: El cliente registra morosidad activa de ${selectedCustomer.delinquencyDays} días en otros bancos.`);
      isAmlOk = false;
    }

    // Alerta de deudas registradas en bancos estatales
    if (stateDebtsNum > 0) {
      amlReasons.push(`ALERTA BANCO ESTATAL: Registra saldo deudor por ₡${stateDebtsNum.toLocaleString()} en Bancos del Estado (SUGEF clase ${selectedCustomer.sugefCategory}).`);
    }

    // Flag: Monto excesivamente alto para ingresos reportados
    if (amountInCRC > monthlyIncome * 10) {
      amlReasons.push('ALERTA AML: El monto del préstamo excede 10 veces el ingreso mensual del cliente.');
    }
    // Flag: Nacionalidad en lista gris/negra o zona geopolítica compleja
    const highRiskCountries = ['Irán', 'Corea del Norte', 'Federación Rusa (Región Sancionada)', 'Siria'];
    if (highRiskCountries.includes(clientNationality)) {
      amlReasons.push(`ALERTA CUMPLIMIENTO: Cliente de nacionalidad de alto riesgo o sancionada geopolíticamente (${clientNationality}).`);
      isAmlOk = false;
    }
    // Flag: Monto de transacción en un solo desembolso supera límites de reporte gubernamental (ej: > $10,000 USD / ~5M CRC)
    if (amountInCRC >= 5120000) {
      amlReasons.push('ALERTA AML: El desembolso supera el umbral de reporte obligatorio de la Ley 8204 Costa Rica (> $10,000 USD). Requiere declaración de origen de fondos.');
    }

    if (amlReasons.length > 0) {
      // If there are fatal AML blocks, it's not OK
      if (amlReasons.some(r => r.includes('cumplimiento') || r.includes('Región Sancionada') || r.includes('MOROSIDAD'))) {
        isAmlOk = false;
      }
    }

    // 5. Scoring Algorítmico (0 a 100 puntos)
    let score = 100;
    
    // Penalización por DTI alto
    if (dtiRatio > 0.40) score -= Math.min(45, Math.round((dtiRatio - 0.40) * 100));
    // Penalización por score crediticio bajo
    if (creditBureauScore < 850) {
      const scoreDiff = 850 - creditBureauScore;
      score -= Math.min(50, Math.round(scoreDiff * 0.1));
    }
    // Penalización por morosidad activa
    if (selectedCustomer.otherBankDelinquency) {
      score -= Math.min(60, selectedCustomer.delinquencyDays * 1.5);
    }
    // Penalización por deudas en bancos públicos
    if (stateDebtsNum > 0) {
      score -= 15;
    }
    // Penalización por alertas AML
    if (amlReasons.length > 0) {
      score -= 10 * amlReasons.filter(r => r.includes('AML')).length;
    }

    score = Math.max(0, Math.min(100, score));

    // Decisión
    let decision: 'APROBADO' | 'REVISION_MANUAL' | 'RECHAZADO' = 'APROBADO';
    if (score < 45 || !isAmlOk || dtiRatio > 0.60 || selectedCustomer.otherBankDelinquency) {
      decision = 'RECHAZADO';
    } else if (score < 70 || dtiRatio > 0.40 || creditBureauScore < 640) {
      decision = 'REVISION_MANUAL';
    }

    // Max loan suggested based on 35% DTI ceiling
    const targetQuotaMax = (monthlyIncome * 0.35) - totalEffectiveDebts;
    const maxLoanSuggested = Math.max(0, Math.round(targetQuotaMax > 0 ? (targetQuotaMax * loanTerm * 0.8) : 0));

    setRiskAssessment({
      score,
      dtiRatio: Math.round(dtiRatio * 100),
      isDtiOk,
      isScoreOk,
      isAmlOk,
      amlReasons,
      decision,
      maxLoanSuggested
    });
  };

  // Convert Currency in Balances
  const handleSwapCurrency = () => {
    if (convertAmount <= 0) return;
    
    const currentBalance = balances[convertFrom];
    if (currentBalance < convertAmount) {
      setSwapFeedback(`❌ Saldo insuficiente en ${convertFrom}. Su saldo actual es ${currentBalance.toLocaleString()}.`);
      return;
    }

    // Rate Calculation
    let targetAmount = 0;
    if (convertFrom === 'CRC' && convertTo === 'USD') {
      targetAmount = convertAmount / exchangeRates.USD_CRC;
    } else if (convertFrom === 'CRC' && convertTo === 'EUR') {
      targetAmount = convertAmount / exchangeRates.EUR_CRC;
    } else if (convertFrom === 'USD' && convertTo === 'CRC') {
      targetAmount = convertAmount * exchangeRates.USD_CRC;
    } else if (convertFrom === 'EUR' && convertTo === 'CRC') {
      targetAmount = convertAmount * exchangeRates.EUR_CRC;
    } else if (convertFrom === 'USD' && convertTo === 'EUR') {
      targetAmount = convertAmount * exchangeRates.USD_EUR;
    } else if (convertFrom === 'EUR' && convertTo === 'USD') {
      targetAmount = convertAmount / exchangeRates.USD_EUR;
    } else {
      targetAmount = convertAmount; // Same currency
    }

    const roundedTarget = Math.round(targetAmount * 100) / 100;

    // Deduct and add
    setBalances(prev => ({
      ...prev,
      [convertFrom]: Math.round((prev[convertFrom] - convertAmount) * 100) / 100,
      [convertTo]: Math.round((prev[convertTo] + roundedTarget) * 100) / 100
    }));

    // Log double entry transaction
    const txId = `tx-swap-${Date.now().toString().slice(-6)}`;
    const txHash = generateHash(`SWAP:${convertFrom}:${convertTo}:${convertAmount}:${Date.now()}`);
    const newTx: LedgerTx = {
      id: txId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'CONVERSION',
      currency: convertFrom,
      amount: convertAmount,
      debitAccount: `PASIVOS_DEPOSITOS_CLIENTE_${convertFrom}`,
      creditAccount: `PASIVOS_DEPOSITOS_CLIENTE_${convertTo}`,
      status: 'APROBADO_LEDGER',
      txHash: txHash
    };

    setLedgerLogs(prev => [newTx, ...prev]);
    setSwapFeedback(`✅ ¡Conversión exitosa! Cambió ${convertAmount.toLocaleString()} ${convertFrom} por ${roundedTarget.toLocaleString()} ${convertTo}.`);
    
    // Clear feedback
    setTimeout(() => {
      setSwapFeedback(null);
    }, 4000);
  };

  // Generate Simple Convincing Cryptographic Hash Simulation (HMAC-SHA256 mock)
  const generateHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0') + 
                Math.abs(hash * 31).toString(16).padStart(8, '0') + 
                Math.abs(hash * 13).toString(16).padStart(8, '0') + 
                Math.abs(hash * 7).toString(16).padStart(8, '0');
    return hex.substring(0, 64);
  };

  // Open Banking API Payload Generator
  const generateMockApiPayload = () => {
    const timestamp = new Date().toISOString();
    const cleanPhone = "50670193160";
    const bankMapping = {
      SINPE: { name: 'Banco Central de Costa Rica (SINPE)', scheme: 'SINPE-MOVIL', endpoint: '/api/v2/sinpe/disburse' },
      SEPA: { name: 'European Central Bank (SEPA Instant)', scheme: 'SEPA-INST-CREDIT', endpoint: '/api/v1/sepa/pay' },
      FEDWIRE: { name: 'Federal Reserve Wire Network', scheme: 'FEDWIRE-WIRE', endpoint: '/api/v3/fedwire/dispatch' }
    };

    const targetBank = bankMapping[apiNetwork];

    if (apiPayloadFormat === 'json') {
      const payloadObj = {
        header: {
          message_id: `BCCR-DISB-${Date.now()}-002`,
          sender_bic: "FULLSTACKACADCRSS",
          receiver_bic: "BCCRCRSJXXX",
          creation_date_time: timestamp,
          security_protocol: "mTLS_v1.3",
          routing_scheme: targetBank.scheme
        },
        disbursement_instruction: {
          credit_transfer_id: `TX-LOAN-${Date.now().toString().slice(-6)}`,
          debtor: {
            name: "FinTech Loan Vault Academia",
            account_iban: "CR20015110000000000100"
          },
          creditor: {
            name: selectedCustomer.name,
            account_iban: selectedCustomer.routingIBAN,
            phone: cleanPhone
          },
          amount: {
            value: loanAmount,
            currency: loanCurrency
          },
          charge_bearer: "SLEV", // Borne by Debtor
          payment_reason: "FINTECH_LOAN_DISBURSEMENT"
        }
      };
      
      const payloadStr = JSON.stringify(payloadObj, null, 2);
      setApiPayload(payloadStr);
      setApiSignature(generateHash(payloadStr + apiWebhookSecret));
    } else {
      const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.08">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>BCCR-DISB-${Date.now()}-002</MsgId>
      <CreDtTm>${timestamp}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <InitgPty>
        <Nm>FinTech Loan Vault Academia</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>TX-LOAN-${Date.now().toString().slice(-6)}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <Dbtr>
        <Nm>FinTech Loan Vault Academia</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>CR20015110000000000100</IBAN>
        </Id>
      </DbtrAcct>
      <DbtrAgt>
        <FinInstnId>
          <BICFI>FULLSTACKACADCRSS</BICFI>
        </FinInstnId>
      </DbtrAgt>
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>E2E-LOAN-${Date.now().toString().slice(-4)}</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="${loanCurrency}">${loanAmount}</InstdAmt>
        </Amt>
        <Cdtr>
          <Nm>${selectedCustomer.name}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>${selectedCustomer.routingIBAN}</IBAN>
          </Id>
        </CdtrAcct>
        <RmtInf>
          <Ustrd>FINTECH_LOAN_DISBURSEMENT</Ustrd>
        </RmtInf>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;
      setApiPayload(xmlStr);
      setApiSignature(generateHash(xmlStr + apiWebhookSecret));
    }
  };

  // Simulates bank routing communication and disbursements
  const handleExecuteDisbursement = () => {
    if (isRoutingRunning) return;
    
    // Check if approved first
    if (riskAssessment.decision === 'RECHAZADO') {
      alert('⚠️ El préstamo está RECHAZADO por el scoring de riesgo. No es seguro despachar este desembolso interbancario.');
      return;
    }

    setIsRoutingRunning(true);
    setRoutingProgress(0);
    setDisbursementSuccess(null);
    setRoutingTerminalLogs([]);

    const networkNames = {
      SINPE: 'SINPE Móvil (Banco Central de Costa Rica)',
      SEPA: 'SEPA Instant Network (Eurosystem)',
      FEDWIRE: 'Federal Reserve FedWire System (USD)'
    };

    const targetNetwork = networkNames[apiNetwork];

    const logs: string[] = [];
    const pushLog = (msg: string) => {
      logs.push(`[${new Date().toLocaleTimeString('es-CR')}] ${msg}`);
      setRoutingTerminalLogs([...logs]);
    };

    // Simulated multi-step connection and routing
    setTimeout(() => {
      pushLog(`🛰️ INICIANDO DESEMBOLSO INTERBANCARIO VÍA ${apiNetwork.toUpperCase()}...`);
      setRoutingProgress(15);
    }, 400);

    setTimeout(() => {
      pushLog(`🔑 Validando firma criptográfica HMAC-SHA256...`);
      pushLog(`➡️ Signature: ${apiSignature.substring(0, 32)}...`);
      setRoutingProgress(35);
    }, 1200);

    setTimeout(() => {
      pushLog(`🛡️ Estableciendo túnel seguro Mutual TLS (mTLS v1.3) con el Banco Central...`);
      pushLog(`🔐 Intercambiando certificados X.509 de la Academia con la pasarela interbancaria.`);
      setRoutingProgress(55);
    }, 2200);

    setTimeout(() => {
      pushLog(`🔗 Enrutando instrucción de pago al IBAN receptor: ${selectedCustomer.routingIBAN}`);
      pushLog(`🏦 Conciliando con el Ledger General de la Academia (Garantía de fondos ACID)...`);
      setRoutingProgress(75);
    }, 3200);

    setTimeout(() => {
      pushLog(`📡 Esperando confirmación de la liquidación en tiempo real (Real-Time Settlement)...`);
      setRoutingProgress(90);
    }, 4200);

    setTimeout(() => {
      // Completed! Add to Client Wallet and debit from bank vault ledger
      pushLog(`✅ ¡ÉXITO! Recibido código HTTP 201 Created.`);
      pushLog(`💸 Fondos transferidos con éxito. Recibo de red de liquidación guardado.`);
      
      // Credit client's wallet with the loan funds!
      setBalances(prev => ({
        ...prev,
        [loanCurrency]: prev[loanCurrency] + loanAmount
      }));

      // Generate ledger double entry for the loan disbursement
      const txId = `tx-disb-${Date.now().toString().slice(-6)}`;
      const txHash = generateHash(`DISBURSE:${loanCurrency}:${loanAmount}:${selectedCustomer.routingIBAN}:${Date.now()}`);
      
      const newTx: LedgerTx = {
        id: txId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'DESEMBOLSO_PRESTAMO',
        currency: loanCurrency,
        amount: loanAmount,
        debitAccount: 'ACTIVOS_PRESTAMOS_POR_COBRAR_CLIENTES',
        creditAccount: `PASIVOS_DEPOSITOS_CLIENTE_${loanCurrency}`,
        status: 'CONCILIADO_SINPE',
        txHash: txHash
      };

      setLedgerLogs(prev => [newTx, ...prev]);

      setRoutingProgress(100);
      setIsRoutingRunning(false);
      setDisbursementSuccess(true);
    }, 5200);
  };

  // Add mock savings deposits to test
  const handleAddSavings = (curr: 'CRC' | 'USD' | 'EUR', amount: number) => {
    setBalances(prev => ({
      ...prev,
      [curr]: prev[curr] + amount
    }));

    const txId = `tx-dep-${Date.now().toString().slice(-6)}`;
    const txHash = generateHash(`DEPOSIT:${curr}:${amount}:${Date.now()}`);
    const newTx: LedgerTx = {
      id: txId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'DEPOSITO',
      currency: curr,
      amount: amount,
      debitAccount: `ACTIVOS_CAJA_BODEGA_${curr}`,
      creditAccount: `PASIVOS_DEPOSITOS_CLIENTE_${curr}`,
      status: 'APROBADO_LEDGER',
      txHash: txHash
    };

    setLedgerLogs(prev => [newTx, ...prev]);
  };

  return (
    <div id="fintech-loan-simulator-widget" className="border border-stone-800 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans text-stone-100">
      
      {/* GLOWING HEADER */}
      <div className="bg-gradient-to-r from-stone-950 via-amber-950/20 to-stone-950 p-4 border-b border-stone-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,150,11,0.15)] animate-pulse">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">
                PROYECTO INTEGRADOR FINTECH
              </span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-100 uppercase tracking-tight">
              Core Ledger & Sistema de Créditos Multidivisa
            </h3>
          </div>
        </div>

        {/* ACTION / SALE BUTTON AND APPLICANT SELECT */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-start sm:justify-end">
          <button
            onClick={() => setIsGithubPanelOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-emerald-400 font-black rounded-xl font-mono text-xs shadow border border-emerald-500/40 transition cursor-pointer active:scale-95"
            title="Pasar todas tus Startups a GitHub"
          >
            <span>🐙 Pasar a GitHub</span>
          </button>

          <button
            onClick={() => setIsAcquisitionModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-xl font-mono text-xs shadow-lg shadow-amber-500/25 transition cursor-pointer active:scale-95 border border-amber-300 animate-pulse"
            title="Adquirir esta Startup FinTech ($50,000 USD / ₡26,000,000 CRC)"
          >
            <Crown className="w-4 h-4 text-stone-950 fill-current" />
            <span className="tracking-wide">EN VENTA: $50,000 USD</span>
          </button>

          {/* SELECT REAL APPLICANT */}
          <div className="flex items-center gap-1.5 bg-stone-950/60 p-1.5 rounded-xl border border-stone-850">
            <span className="text-[9px] font-mono text-stone-400 uppercase font-black pl-1 hidden md:inline">Cliente en Estudio:</span>
            <select
              value={selectedCustomer.id}
              onChange={(e) => {
                const selected = customersList.find(c => c.id === e.target.value);
                if (selected) setSelectedCustomer(selected);
              }}
              className="bg-stone-900 border border-stone-800 text-stone-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500 font-bold"
            >
              {customersList.length === 0 ? (
                <option value="sin-seleccion">📋 Base Limpia (Sin clientes registrados)</option>
              ) : (
                customersList.map(c => (
                  <option key={c.id} value={c.id}>
                    👤 {c.name} {c.cedula ? `(${c.cedula})` : ''}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>

      {/* GITHUB EXPORT ASSISTANT PANEL */}
      {isGithubPanelOpen && (
        <div className="bg-gradient-to-r from-stone-950 via-emerald-950/25 to-stone-950 border-b border-emerald-500/40 p-4 sm:p-5 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <span>🐙 CENTRO OFICIAL PARA PASAR TUS 6 STARTUPS A GITHUB</span>
            </h4>
            <button
              type="button"
              onClick={() => setIsGithubPanelOpen(false)}
              className="text-xs font-mono text-stone-400 hover:text-stone-200 px-2 py-0.5 rounded bg-stone-900 border border-stone-800 cursor-pointer"
            >
              ✕ Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* OPCIÓN 1: BOTÓN NATIVO DE GOOGLE AI STUDIO */}
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2">
              <span className="text-[10px] font-mono font-black text-amber-400 uppercase block">
                ⭐ Opción 1 (Más Fácil y Sin Claves): Botón Arriba a la Derecha
              </span>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                En la barra superior derecha de tu pantalla de <strong>Google AI Studio</strong> (arriba de esta aplicación), verás el ícono de <strong>GitHub (el gatito)</strong> o el botón de <strong>Descargar ZIP</strong>:
              </p>
              <ul className="list-disc list-inside text-[11px] text-stone-400 space-y-1">
                <li>Haz clic en el ícono de <strong>GitHub</strong> arriba a la derecha para sincronizar directo con tu cuenta.</li>
                <li>O descarga el archivo <strong>ZIP</strong> y súbelo en <strong>github.com/new</strong>.</li>
              </ul>
            </div>

            {/* OPCIÓN 2: SUBIDA AUTOMÁTICA DESDE AQUÍ CON TOKEN */}
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-emerald-500/30 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-black text-emerald-400 uppercase block">
                  🚀 Opción 2: Subida Automática en 1 Clic desde este Servidor
                </span>
                <a
                  href="https://github.com/settings/tokens/new?description=Mariterys+Studio+Startups&scopes=repo"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-black text-[10px] rounded-lg inline-flex items-center gap-1 shadow shrink-0"
                >
                  🔑 1. Clic aquí para sacar tu Token en GitHub →
                </a>
              </div>
              <p className="text-[10.5px] text-stone-300 leading-relaxed">
                ¿Qué es el Token? Es una <strong>llave de permiso de GitHub</strong>. Haz clic en el botón amarillo <strong>"1. Clic aquí para sacar tu Token"</strong>, baja al final de esa página de GitHub, toca el botón verde <strong>"Generate token"</strong> y copia el código que empieza con <code>ghp_...</code>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-mono text-stone-400 uppercase block mb-1">Nombre del Repositorio:</label>
                  <input
                    type="text"
                    value={ghRepoName}
                    onChange={(e) => setGhRepoName(e.target.value)}
                    placeholder="mariterys-studio-startups"
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono text-stone-400 uppercase block mb-1">Tu Token de GitHub (ghp_...):</label>
                  <input
                    type="password"
                    value={ghToken}
                    onChange={(e) => setGhToken(e.target.value)}
                    placeholder="Pega tu Personal Access Token"
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-100"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handlePushStartupsToGithub}
                disabled={ghIsPushing}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-mono font-black text-xs uppercase rounded-lg cursor-pointer shadow"
              >
                {ghIsPushing ? 'Subiendo tus 6 Startups a GitHub...' : '🐙 Crear Repositorio y Subir Mis Startups a GitHub'}
              </button>
              {ghFeedback && (
                <div className={`p-2 rounded-lg text-[11px] font-mono ${ghFeedback.ok ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/50 text-rose-300 border border-rose-500/30'}`}>
                  <p>{ghFeedback.msg}</p>
                  {ghFeedback.url && (
                    <a
                      href={ghFeedback.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-1 text-amber-400 underline font-bold"
                    >
                      🔗 Abrir mi Repositorio en GitHub: {ghFeedback.url}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WORKSPACE SUB-TAB BUTTONS */}
      <div className="bg-stone-950 border-b border-stone-850 p-1.5 flex flex-wrap gap-1.5 justify-start">
        <button
          onClick={() => setActiveSubTab('ai_executive')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
            activeSubTab === 'ai_executive'
              ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/25 text-amber-300 border border-amber-500/50 shadow-amber-500/10'
              : 'text-amber-400/90 hover:text-amber-200 hover:bg-amber-950/40 border border-amber-500/30'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Ejecutivo IA & Despacho Gerencial</span>
          <span className="bg-amber-500 text-stone-950 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
            CONTROL DUAL
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'database'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          Clientes & Buró SUGEF
        </button>

        <button
          onClick={() => setActiveSubTab('wallets')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'wallets'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          Ahorros y Divisas
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'calculator'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          Cálculo Financiero
        </button>

        <button
          onClick={() => setActiveSubTab('risk')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'risk'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Risk Scoring & AML
        </button>

        <button
          onClick={() => setActiveSubTab('api')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'api'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          API Router & Webhook
        </button>

        <button
          onClick={() => setActiveSubTab('ledger')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'ledger'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Double-Entry Ledger
        </button>

        <button
          onClick={() => setActiveSubTab('viewmodel')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'viewmodel'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-black'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 border border-transparent'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          CardPayViewModel.kt
          <span className="bg-blue-950 text-blue-400 text-[8px] px-1 py-0.5 rounded font-black uppercase">StateFlow</span>
        </button>
      </div>

      {/* CORE SIMULATOR BODY */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[600px] space-y-5">
        
        {/* ================== TAB: AI EXECUTIVE BOT & DEAL CLOSER ================== */}
        {activeSubTab === 'ai_executive' && (
          <div className="space-y-4 animate-fadeIn">
            <FintechExecutiveBot
              customer={selectedCustomer}
              balances={balances}
              ledgerLogsCount={ledgerLogs.length}
              onDisburseLoan={(amount, currency, proposal) => {
                // Update customer wallet balance
                setBalances(prev => ({
                  ...prev,
                  [currency]: Math.round(((prev[currency as keyof typeof prev] || 0) + amount) * 100) / 100
                }));

                // Record double-entry transaction in Ledger with Manager Sign-off
                const txId = `tx-deal-${Date.now().toString().slice(-6)}`;
                const mgrCode = proposal.managerApproval?.approvalCode || 'MGR-AUTH';
                const txHash = generateHash(`DEAL_CLOSED:${currency}:${amount}:${selectedCustomer.routingIBAN}:${mgrCode}:${Date.now()}`);
                const newTx: LedgerTx = {
                  id: txId,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  type: 'DESEMBOLSO_PRESTAMO',
                  currency: currency as 'CRC' | 'USD' | 'EUR',
                  amount: amount,
                  debitAccount: 'ACTIVOS_PRESTAMOS_POR_COBRAR_CLIENTES',
                  creditAccount: `PASIVOS_DEPOSITOS_CLIENTE_${currency}`,
                  status: 'CONCILIADO_SINPE',
                  txHash: txHash
                };

                setLedgerLogs(prev => [newTx, ...prev]);
              }}
            />
          </div>
        )}

        {/* ================== TAB: CUSTOMER DATABASE & BUREAU ================== */}
        {activeSubTab === 'database' && (
          <div className="space-y-5 animate-fadeIn">
            {/* EDUCATIONAL DISCLAIMER & EXPLANATION */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 flex items-start gap-4 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  Centro de Consulta de Crédito y SUGEF
                </h4>
                <p className="text-[11.5px] text-stone-400 leading-relaxed font-sans">
                  Bienvenida <strong>María Teresa</strong>. Este módulo gestiona la conexión con los sistemas de la <strong>SUGEF (Superintendencia General de Entidades Financieras)</strong> y burós de crédito en Costa Rica. Permite realizar estudios de viabilidad financiera analizando deudas en bancos estatales e historial de morosidad.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* LEFT COLUMN: SEARCH DIRECTORY & REGISTRATION (LG: 7/12) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* DIRECTORY SECTION */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-900 pb-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      📁 DIRECTORIO DE CANDIDATOS Y ESTUDIOS REGISTRADOS ({customersList.length})
                    </span>
                    
                    {/* FILTER STATUS TABS */}
                    <div className="flex gap-1 bg-stone-900 p-1 rounded-lg border border-stone-850">
                      {(['TODOS', 'AL_DIA', 'CON_MORA'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setDbFilterStatus(st)}
                          className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase cursor-pointer transition-all ${
                            dbFilterStatus === st
                              ? 'bg-amber-500 text-stone-950 font-black shadow'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          {st === 'TODOS' ? 'Todos' : st === 'AL_DIA' ? 'Al Día' : 'Con Mora ⚠️'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SEARCH BAR */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Buscar por nombre, nacionalidad, IBAN o tarjeta..."
                      value={dbSearchQuery}
                      onChange={(e) => setDbSearchQuery(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-mono"
                    />
                    {dbSearchQuery && (
                      <button
                        onClick={() => setDbSearchQuery('')}
                        className="bg-stone-900 hover:bg-stone-800 text-stone-400 px-2.5 py-1 rounded-lg text-[10px] font-mono border border-stone-800 transition-all cursor-pointer"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  {/* CUSTOMER DIRECTORY LIST / CARDS */}
                  <div className="space-y-2.5 max-h-[250px] overflow-y-auto scrollbar-thin">
                    {customersList.filter(c => {
                      const matchesSearch = c.name.toLowerCase().includes(dbSearchQuery.toLowerCase()) || 
                                            c.nationality.toLowerCase().includes(dbSearchQuery.toLowerCase()) ||
                                            (c.cedula && c.cedula.includes(dbSearchQuery)) ||
                                            (c.cardSINPE && c.cardSINPE.includes(dbSearchQuery)) ||
                                            (c.routingIBAN && c.routingIBAN.toLowerCase().includes(dbSearchQuery.toLowerCase()));
                      if (dbFilterStatus === 'AL_DIA') return matchesSearch && !c.otherBankDelinquency;
                      if (dbFilterStatus === 'CON_MORA') return matchesSearch && c.otherBankDelinquency;
                      return matchesSearch;
                    }).length === 0 ? (
                      <div className="text-center py-8 px-4 text-stone-400 font-sans text-xs bg-stone-900/40 rounded-xl border border-dashed border-stone-800">
                        📋 Base de datos limpia (sin datos de simulacro).<br />
                        <span className="text-amber-400 font-bold">
                          Ingresa abajo el número de Cédula o el Nombre de una persona real para evaluarla en el Buró.
                        </span>
                      </div>
                    ) : (
                      customersList.filter(c => {
                        const matchesSearch = c.name.toLowerCase().includes(dbSearchQuery.toLowerCase()) || 
                                              c.nationality.toLowerCase().includes(dbSearchQuery.toLowerCase()) ||
                                              (c.cedula && c.cedula.includes(dbSearchQuery)) ||
                                              (c.cardSINPE && c.cardSINPE.includes(dbSearchQuery)) ||
                                              (c.routingIBAN && c.routingIBAN.toLowerCase().includes(dbSearchQuery.toLowerCase()));
                        if (dbFilterStatus === 'AL_DIA') return matchesSearch && !c.otherBankDelinquency;
                        if (dbFilterStatus === 'CON_MORA') return matchesSearch && c.otherBankDelinquency;
                        return matchesSearch;
                      }).map((cust) => {
                        const isSelected = selectedCustomer.id === cust.id;
                        return (
                          <div
                            key={cust.id}
                            onClick={() => setSelectedCustomer(cust)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.05)]'
                                : 'bg-stone-900/40 border-stone-850 hover:bg-stone-900 hover:border-stone-800'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div className="space-y-1">
                                <h5 className="font-bold text-xs text-stone-100 flex items-center gap-1.5">
                                  <span>👤 {cust.name}</span>
                                  {cust.cedula && (
                                    <span className="text-[9px] bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                                      Céd: {cust.cedula}
                                    </span>
                                  )}
                                </h5>
                                <div className="text-[10px] text-stone-400 font-mono space-y-0.5">
                                  <p>Nacionalidad: {cust.nationality} • Score: <strong className="text-amber-400">{cust.creditScore}</strong></p>
                                  <p className="truncate max-w-[320px]">IBAN: {cust.routingIBAN}</p>
                                  {cust.cardSINPE && <p>SINPE / Tarjeta: {cust.cardSINPE}</p>}
                                </div>
                              </div>

                              {/* STATUS INDICATORS + DELETE BUTTON */}
                              <div className="flex flex-col items-end gap-1.5 text-right font-mono text-[9px]">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-1.5 py-0.5 rounded font-bold border ${
                                    cust.otherBankDelinquency
                                      ? 'bg-rose-950/30 border-rose-500/20 text-rose-400'
                                      : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
                                  }`}>
                                    {cust.otherBankDelinquency ? `Mora ${cust.delinquencyDays} días ⚠️` : 'Al Día ✓'}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteCustomer(cust.id, e)}
                                    className="px-1.5 py-0.5 rounded bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-400 border border-stone-800 cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    ✕
                                  </button>
                                </div>
                                {cust.stateBankDebts > 0 ? (
                                  <span className="text-stone-400">Deuda Reportada: ₡{cust.stateBankDebts.toLocaleString()}</span>
                                ) : (
                                  <span className="text-emerald-500">Sin deudas públicas</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* REGISTRATION FORM SECTION + LIVE NAME OR CEDULA CONSULTATION */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-900 pb-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      🔎 CONSULTA EN VIVO DE PERSONAS REALES (POR NOMBRE COMPLETO O CÉDULA)
                    </span>
                    {customersList.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setCustomersList([]);
                          setSelectedCustomer(EMPTY_INITIAL_PROFILE);
                          setHaciendaMatches([]);
                          setFormMessage('🧹 Directorio vaciado por completo.');
                        }}
                        className="text-[9px] font-mono text-rose-400 hover:text-rose-300 bg-rose-950/30 px-2 py-0.5 rounded border border-rose-500/30 cursor-pointer"
                      >
                        🧹 Vaciar Lista
                      </button>
                    )}
                  </div>

                  {/* BUSCADOR EN VIVO POR NOMBRE O CÉDULA DE COSTA RICA */}
                  <div className="p-3 bg-stone-900/80 border border-amber-500/30 rounded-xl space-y-2.5">
                    <label className="text-[10px] font-mono text-amber-300 block uppercase font-bold">
                      1. Buscar Persona Real por Nombre y Apellidos o por Cédula (API Oficial Hacienda / TSE CR):
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Escribe un Nombre Real (Ej: María Teresa Jirón) o Cédula (9 dígitos)"
                        value={formCedula}
                        onChange={(e) => setFormCedula(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleLookupRealPerson();
                          }
                        }}
                        className="flex-1 bg-stone-950 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleLookupRealPerson()}
                        disabled={isConsultingCedula}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-stone-950 font-mono text-xs font-black uppercase rounded-lg cursor-pointer shrink-0 shadow"
                      >
                        {isConsultingCedula ? 'Buscando en Vivo...' : '🔍 Buscar Persona Real'}
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-relaxed">
                      Conecta en tiempo real con la base pública del <strong>Ministerio de Hacienda y Padrón TSE de Costa Rica</strong>. Si ingresas un nombre real o número de cédula, extrae la identidad oficial, número de cédula, estado tributario y verifica si registra <strong>Morosidad u Omisión oficial</strong>.
                    </p>

                    {/* BOTÓN DE PRUEBA RÁPIDA EN 1 CLIC */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[9.5px] font-mono text-stone-400 font-bold">Prueba rápida en 1 clic:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormCedula('María Teresa Jirón Bermúdez');
                          handleLookupRealPerson('María Teresa Jirón Bermúdez');
                        }}
                        disabled={isConsultingCedula}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold cursor-pointer transition"
                      >
                        ⚡ Probar con mi nombre: María Teresa Jirón Bermúdez
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormCedula('602400554');
                          handleLookupRealPerson('602400554');
                        }}
                        disabled={isConsultingCedula}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold cursor-pointer transition"
                      >
                        ⚡ Probar por Cédula: 602400554
                      </button>
                    </div>

                    {/* LISTA DE COINCIDENCIAS REALES CUANDO SE BUSCA POR NOMBRE */}
                    {haciendaMatches.length > 1 && (
                      <div className="pt-2 border-t border-stone-800 space-y-1.5">
                        <span className="text-[9.5px] font-mono text-emerald-400 font-bold uppercase block">
                          👥 Coincidencias Reales Encontradas ({haciendaMatches.length}) — Haz clic en la persona para cargar su Buró:
                        </span>
                        <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                          {haciendaMatches.map((m) => (
                            <button
                              key={m.cedula}
                              type="button"
                              onClick={() => fetchAndPopulateByCedula(m.cedula, m.fullname)}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/40 flex items-center justify-between text-[11px] transition cursor-pointer"
                            >
                              <span className="font-bold text-stone-100 truncate">👤 {m.fullname}</span>
                              <span className="font-mono text-[10px] text-amber-400 shrink-0 ml-2">Cédula: {m.cedula} →</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleAddCustomer} className="space-y-3.5 font-sans">
                    {formMessage && (
                      <div className="p-2.5 bg-stone-900 rounded-lg border border-amber-500/40 text-xs text-amber-200 text-center font-mono animate-fadeIn">
                        {formMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Nombre Completo (o escribe aquí y pulsa Buscar):</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            required
                            placeholder="Ej: María Teresa Jirón Bermúdez"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleLookupRealPerson(formName);
                              }
                            }}
                            className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-bold"
                          />
                          <button
                            type="button"
                            onClick={() => handleLookupRealPerson(formName)}
                            disabled={isConsultingCedula}
                            className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-lg text-[10px] font-mono font-bold shrink-0 cursor-pointer"
                            title="Buscar este nombre en el Padrón TSE y Hacienda"
                          >
                            🔍 Buscar
                          </button>
                        </div>
                      </div>

                      {/* Nationality */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Nacionalidad:</label>
                        <input
                          type="text"
                          placeholder="Costa Rica"
                          value={formNationality}
                          onChange={(e) => setFormNationality(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Monthly Income */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Ingreso Mensual (₡ CRC):</label>
                        <input
                          type="number"
                          value={formIncome}
                          onChange={(e) => setFormIncome(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Existing Debts */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Otras Deudas Mensuales (₡ CRC):</label>
                        <input
                          type="number"
                          value={formDebts}
                          onChange={(e) => setFormDebts(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* FICO Score */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Credit FICO Score (300 - 850):</label>
                        <input
                          type="number"
                          min={300}
                          max={850}
                          value={formScore}
                          onChange={(e) => setFormScore(Math.min(850, Math.max(300, parseInt(e.target.value) || 300)))}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Target IBAN */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Cuenta de Envío (IBAN):</label>
                        <input
                          type="text"
                          placeholder="CR15015..."
                          value={formIBAN}
                          onChange={(e) => setFormIBAN(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>

                       {/* Card / SINPE Móvil */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Teléfono SINPE Móvil / Tarjeta:</label>
                        <input
                          type="text"
                          placeholder="Ej: 8888-8888"
                          value={formCard}
                          onChange={(e) => setFormCard(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* State Bank Debts */}
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Deudas en Bancos Estatales (₡ CRC):</label>
                        <input
                          type="number"
                          value={formStateDebts}
                          onChange={(e) => setFormStateDebts(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      {/* Delinquency toggle */}
                      <div className="space-y-1.5">
                        <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">¿Presenta Morosidad en otros bancos?</label>
                        <div className="grid grid-cols-2 gap-2 bg-stone-900 p-1 rounded-lg border border-stone-800">
                          <button
                            type="button"
                            onClick={() => setFormDelinquency(false)}
                            className={`py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                              !formDelinquency
                                ? 'bg-emerald-500 text-stone-950 font-black'
                                : 'text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            No / Al Día
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormDelinquency(true)}
                            className={`py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                              formDelinquency
                                ? 'bg-rose-500 text-stone-950 font-black'
                                : 'text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            Sí (Mora Activa)
                          </button>
                        </div>
                      </div>

                      {/* Delinquency Days & SUGEF Category */}
                      {formDelinquency ? (
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Días de Atraso en Cuotas:</label>
                          <input
                            type="number"
                            min={1}
                            value={formDelinquencyDays}
                            onChange={(e) => {
                              const days = Math.max(1, parseInt(e.target.value) || 1);
                              setFormDelinquencyDays(days);
                              if (days > 90) setFormSugefCategory('D');
                              else if (days > 30) setFormSugefCategory('C');
                              else setFormSugefCategory('B');
                            }}
                            className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Clasificación SUGEF Sugerida:</label>
                          <select
                            value={formSugefCategory}
                            onChange={(e) => setFormSugefCategory(e.target.value as any)}
                            className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                          >
                            <option value="A1">A1 - Excelente Solvencia</option>
                            <option value="A2">A2 - Riesgo Muy Leve</option>
                            <option value="B">B - Riesgo Aceptable</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9.5px] font-mono text-stone-400 block uppercase font-bold">Detalle / Notas de Historial Crediticio:</label>
                      <textarea
                        placeholder="Ej: Banco Nacional: Crédito hipotecario al día. BCR: Sin mora."
                        value={formDebtDetails}
                        onChange={(e) => setFormDebtDetails(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs h-12 focus:outline-none focus:border-amber-500 font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      Registrar Candidato & Cargar en Estudio
                    </button>
                  </form>
                </div>
              </div>

              {/* RIGHT COLUMN: DETAILED BÚRO DE CRÉDITO / SUGEF REPORT (LG: 5/12) */}
              <div className="lg:col-span-5 bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-900 pb-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      📊 ARCHIVO OFICIAL CONSULTA DE HISTORIAL SUGEF-CIC
                    </span>
                    <span className="text-[8px] bg-red-500/10 text-rose-400 px-1.5 py-0.5 rounded border border-red-500/20 font-mono font-black">
                      CONFIDENCIAL
                    </span>
                  </div>

                  {/* BANK REPORT CARD */}
                  <div className="bg-stone-900/40 p-4.5 rounded-xl border border-stone-800 space-y-4 font-mono text-[11px] leading-relaxed relative overflow-hidden">
                    {/* WATERMARK */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-stone-100 text-7xl font-black rotate-12 select-none pointer-events-none tracking-widest font-sans">
                      SUGEF
                    </div>

                    <div className="border-b border-stone-800 pb-2 flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-stone-200 font-sans">REPORTE FINANCIERO CONSOLIDADO</h4>
                        <p className="text-[9px] text-stone-400">Generado el: {new Date().toISOString().split('T')[0]} • Ref: CIC-{selectedCustomer.id.toUpperCase()}</p>
                      </div>
                      <span className={`text-[12px] font-black px-2 py-0.5 rounded border ${
                        selectedCustomer.otherBankDelinquency 
                          ? 'bg-rose-950/40 border-rose-500/30 text-rose-400' 
                          : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                      }`}>
                        Categoría: {selectedCustomer.sugefCategory}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Titular:</span>
                        <span className="text-stone-100 font-sans font-bold">{selectedCustomer.name}</span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Identificación / Cédula:</span>
                        <span className="text-stone-200">{selectedCustomer.cedula || 'Pendiente de ingreso'}</span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Nacionalidad:</span>
                        <span className="text-stone-200 font-sans">{selectedCustomer.nationality}</span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">FICO Score Central:</span>
                        <span className={`font-black ${
                          selectedCustomer.creditScore >= 700 
                            ? 'text-emerald-400' 
                            : selectedCustomer.creditScore >= 600 
                            ? 'text-amber-400' 
                            : 'text-rose-400'
                        }`}>
                          {selectedCustomer.creditScore} / 850 Puntos
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Ingreso Reportado:</span>
                        <span className="text-stone-100 font-bold">₡{selectedCustomer.monthlyIncome.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Deuda Interna Actual:</span>
                        <span className="text-stone-300">₡{selectedCustomer.currentDebts.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Deuda en Banca Estatal:</span>
                        <span className={`font-bold ${selectedCustomer.stateBankDebts > 0 ? 'text-amber-400' : 'text-stone-300'}`}>
                          ₡{selectedCustomer.stateBankDebts.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-400 uppercase font-bold text-[10px]">Estado de Morosidad:</span>
                        <span className={`font-black uppercase ${
                          selectedCustomer.otherBankDelinquency ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          {selectedCustomer.otherBankDelinquency 
                            ? `⚠️ MOROSIDAD ACTIVA (${selectedCustomer.delinquencyDays} días)` 
                            : '🟢 AL DÍA / AL CORRIENTE'
                          }
                        </span>
                      </div>
                    </div>

                    <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-850 space-y-1">
                      <span className="text-[8.5px] font-mono text-stone-500 font-black uppercase">Notas de Buró Bancario:</span>
                      <p className="text-[10px] text-stone-300 leading-relaxed font-sans italic">
                        "{selectedCustomer.debtDetails || 'Sin anotaciones particulares encontradas en el historial.'}"
                      </p>
                    </div>
                  </div>

                  {/* CREDIT ELIGIBILITY RECOMMENDATION ACCORDING TO USER STATE */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    selectedCustomer.otherBankDelinquency
                      ? 'bg-rose-950/20 border-rose-500/20 text-rose-300'
                      : selectedCustomer.stateBankDebts > 500000 || selectedCustomer.creditScore < 640
                      ? 'bg-amber-950/20 border-amber-500/20 text-amber-300'
                      : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                  }`}>
                    <span className="text-[9px] font-mono font-bold block uppercase opacity-80">VERDICTO DE POLÍTICAS DE CRÉDITO:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">
                        {selectedCustomer.otherBankDelinquency ? '🔴' : (selectedCustomer.stateBankDebts > 500000 || selectedCustomer.creditScore < 640) ? '🟡' : '🟢'}
                      </span>
                      <h5 className="text-xs font-black uppercase tracking-tight font-mono">
                        {selectedCustomer.otherBankDelinquency 
                          ? 'SISTEMA DECLINA PRE-APROBACIÓN' 
                          : (selectedCustomer.stateBankDebts > 500000 || selectedCustomer.creditScore < 640)
                          ? 'RECOMENDADO PARA ESTUDIO MANUAL'
                          : 'SISTEMA AUTORIZA PRE-APROBACIÓN AUTOMÁTICA'
                        }
                      </h5>
                    </div>
                    <p className="text-[10.5px] font-sans opacity-90 leading-snug">
                      {selectedCustomer.otherBankDelinquency
                        ? `Rechazado debido a morosidad activa en otras entidades bancarias por más de ${selectedCustomer.delinquencyDays} días. Incompatible con el perfil mínimo de bajo riesgo.`
                        : (selectedCustomer.stateBankDebts > 500000 || selectedCustomer.creditScore < 640)
                        ? `Se califica con riesgo moderado. Cuenta con deudas estatales vigentes o historial crediticio en zona de cautela. Requiere análisis humano para valorar codeudores o garantías adicionales.`
                        : `El titular califica de forma óptima para préstamos. Capacidad de endeudamiento DTI saludable y sin alertas regulatorias ni moras registradas.`
                      }
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSubTab('calculator')}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                    >
                      <Calculator className="w-4 h-4" />
                      Cargar en Calculador Financiero
                    </button>
                    <button
                      onClick={() => setActiveSubTab('risk')}
                      className="w-full bg-stone-900 hover:bg-stone-850 text-stone-300 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-stone-800"
                    >
                      <Cpu className="w-4 h-4" />
                      Verificar en Risk Engine
                    </button>
                  </div>
                  <div className="bg-stone-900/30 p-2.5 rounded-lg border border-stone-850 text-[9px] font-mono text-stone-400 text-center">
                    Cargar un perfil aplicará sus parámetros de ingreso, deudas e historial directamente a los módulos activos del Fintech.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB: WALLETS & SAVINGS ================== */}
        {activeSubTab === 'wallets' && (
          <div className="space-y-5 animate-fadeIn">
            {/* WALLET OVERVIEW CHIPS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* WALLET CRC */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-inner">
                <div className="flex items-center justify-between border-b border-stone-900 pb-2 mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">₡ WALLET COLONES</span>
                  <span className="text-[9px] bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-850">CRC</span>
                </div>
                <div className="text-xl font-black font-mono text-stone-100">
                  ₡{balances.CRC.toLocaleString('es-CR')}
                </div>
                <div className="flex gap-1.5 mt-3 pt-2 border-t border-stone-900">
                  <button 
                    onClick={() => handleAddSavings('CRC', 100000)}
                    className="w-full text-center text-[9px] font-bold uppercase bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-stone-400 py-1 rounded transition-colors cursor-pointer"
                  >
                    + ₡100K Ahorro
                  </button>
                </div>
              </div>

              {/* WALLET USD */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-inner">
                <div className="flex items-center justify-between border-b border-stone-900 pb-2 mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">$ WALLET DOLLARS</span>
                  <span className="text-[9px] bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-850">USD</span>
                </div>
                <div className="text-xl font-black font-mono text-emerald-400">
                  ${balances.USD.toLocaleString('en-US')}
                </div>
                <div className="flex gap-1.5 mt-3 pt-2 border-t border-stone-900">
                  <button 
                    onClick={() => handleAddSavings('USD', 200)}
                    className="w-full text-center text-[9px] font-bold uppercase bg-stone-900 hover:bg-emerald-600 hover:text-stone-950 text-stone-400 py-1 rounded transition-colors cursor-pointer"
                  >
                    + $200 Ahorro
                  </button>
                </div>
              </div>

              {/* WALLET EUR */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-inner">
                <div className="flex items-center justify-between border-b border-stone-900 pb-2 mb-2">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">€ WALLET EUROS</span>
                  <span className="text-[9px] bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-850">EUR</span>
                </div>
                <div className="text-xl font-black font-mono text-blue-400">
                  €{balances.EUR.toLocaleString('en-US')}
                </div>
                <div className="flex gap-1.5 mt-3 pt-2 border-t border-stone-900">
                  <button 
                    onClick={() => handleAddSavings('EUR', 200)}
                    className="w-full text-center text-[9px] font-bold uppercase bg-stone-900 hover:bg-blue-600 hover:text-stone-950 text-stone-400 py-1 rounded transition-colors cursor-pointer"
                  >
                    + €200 Ahorro
                  </button>
                </div>
              </div>
            </div>

            {/* EXCHANGE RATE INTERACTIVE CONVERTER */}
            <div className="bg-stone-950 p-4.5 rounded-xl border border-stone-850 space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-900 pb-2">
                <ArrowRightLeft className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-black uppercase font-mono tracking-wider text-amber-400">
                  Módulo de Intercambio Instantáneo & Divisas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* AMOUNT INPUT */}
                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Monto a convertir:</label>
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* CONVERT FROM SELECT */}
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Desde divisa:</label>
                  <select
                    value={convertFrom}
                    onChange={(e) => setConvertFrom(e.target.value as 'CRC' | 'USD' | 'EUR')}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="CRC">CRC - Colones</option>
                    <option value="USD">USD - Dólares</option>
                    <option value="EUR">EUR - Euros</option>
                  </select>
                </div>

                {/* SWAP ICON */}
                <div className="md:col-span-1 flex justify-center pb-2">
                  <button 
                    onClick={() => {
                      const temp = convertFrom;
                      setConvertFrom(convertTo);
                      setConvertTo(temp);
                    }}
                    className="p-1.5 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    🔄
                  </button>
                </div>

                {/* CONVERT TO SELECT */}
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Hacia divisa:</label>
                  <select
                    value={convertTo}
                    onChange={(e) => setConvertTo(e.target.value as 'CRC' | 'USD' | 'EUR')}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="CRC">CRC - Colones</option>
                    <option value="USD">USD - Dólares</option>
                    <option value="EUR">EUR - Euros</option>
                  </select>
                </div>

                {/* EXECUTE BUTTON */}
                <div className="md:col-span-1">
                  <button
                    onClick={handleSwapCurrency}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-black px-2 py-2 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    Swap
                  </button>
                </div>
              </div>

              {/* EXCHANGE RATES TABLE */}
              <div className="bg-stone-900/40 p-2.5 rounded-lg border border-stone-850/60 flex items-center justify-between text-[10.5px] font-mono text-stone-400">
                <span>📍 Tasas de cambio bancarias fijas:</span>
                <div className="flex gap-4">
                  <span>💵 1 USD = <strong>₡{exchangeRates.USD_CRC} CRC</strong></span>
                  <span>💶 1 EUR = <strong>₡{exchangeRates.EUR_CRC} CRC</strong></span>
                  <span>💱 1 USD = <strong>{exchangeRates.USD_EUR} EUR</strong></span>
                </div>
              </div>

              {/* SWAP FEEDBACK */}
              {swapFeedback && (
                <div className={`p-3 rounded-lg border text-xs text-center font-semibold leading-relaxed ${
                  swapFeedback.startsWith('✅') 
                    ? 'bg-emerald-950/40 border-emerald-500/25 text-emerald-300' 
                    : 'bg-rose-950/40 border-rose-500/25 text-rose-300'
                }`}>
                  {swapFeedback}
                </div>
              )}
            </div>

            {/* CURRENCY EXCHANGER EXPLANATION CARD */}
            <div className="bg-stone-950/50 p-4 rounded-xl border border-stone-850/60 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">MÓDULO EDUCATIVO • DIVERSIFICACIÓN</span>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  En los sistemas FinTech modernos, un cliente mantiene múltiples sub-cuentas líquidas (divisas líquidas). Esto permite realizar operaciones de arbitraje, mitigar la devaluación local de la moneda mediante ahorro en monedas duras como USD o EUR, y desembolsar o debitar créditos de manera instantánea en la divisa preferida.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB: LOAN CALCULATOR ================== */}
        {activeSubTab === 'calculator' && (
          <div className="space-y-5 animate-fadeIn">
            {/* INPUT CONTROLS ROW */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* MONTO DEL PRÉSTAMO */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Monto Préstamo:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Math.max(1000, parseFloat(e.target.value) || 0))}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg pl-3 pr-12 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-2.5 top-1.5 text-[9.5px] font-mono text-stone-500 font-extrabold">{loanCurrency}</span>
                </div>
              </div>

              {/* DIVISA */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Divisa Crédito:</label>
                <select
                  value={loanCurrency}
                  onChange={(e) => setLoanCurrency(e.target.value as 'CRC' | 'USD' | 'EUR')}
                  className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="CRC">CRC - Colones ₡</option>
                  <option value="USD">USD - Dólares $</option>
                  <option value="EUR">EUR - Euros €</option>
                </select>
              </div>

              {/* TASA DE INTERÉS ANUAL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Tasa Anual (%):</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-2.5 top-1.5 text-[9.5px] font-mono text-stone-500 font-extrabold">%</span>
                </div>
              </div>

              {/* PLAZO (MESES) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Plazo (Meses):</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* SISTEMA DE AMORTIZACIÓN */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Algoritmo Amortización:</label>
                <div className="grid grid-cols-2 gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
                  <button
                    onClick={() => setAmortizationSystem('french')}
                    className={`py-1 rounded text-[9.5px] font-bold cursor-pointer transition-all ${
                      amortizationSystem === 'french'
                        ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Francés
                  </button>
                  <button
                    onClick={() => setAmortizationSystem('german')}
                    className={`py-1 rounded text-[9.5px] font-bold cursor-pointer transition-all ${
                      amortizationSystem === 'german'
                        ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Alemán
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTS OVERVIEW CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850">
                <span className="text-[9px] font-mono text-stone-500 block uppercase font-bold">CUOTA MENSUAL BASE</span>
                <span className="text-xl font-black font-mono text-amber-400 block">
                  {loanCurrency === 'CRC' ? '₡' : loanCurrency === 'USD' ? '$' : '€'}
                  {totals.monthlyPaymentBase.toLocaleString()} {loanCurrency}
                </span>
                <span className="text-[8px] font-mono text-stone-500">
                  {amortizationSystem === 'french' ? '* Cuota mensual fija' : '* Primera cuota máxima decreciente'}
                </span>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850">
                <span className="text-[9px] font-mono text-stone-500 block uppercase font-bold">TOTAL INTERESES COBRADOS</span>
                <span className="text-xl font-black font-mono text-red-400 block">
                  {loanCurrency === 'CRC' ? '₡' : loanCurrency === 'USD' ? '$' : '€'}
                  {totals.totalInterest.toLocaleString()} {loanCurrency}
                </span>
                <span className="text-[8px] font-mono text-stone-500">
                  * Tasa nominal anual del {interestRate}%
                </span>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-850">
                <span className="text-[9px] font-mono text-stone-500 block uppercase font-bold">RETORNO TOTAL CONSOLIDADO</span>
                <span className="text-xl font-black font-mono text-emerald-400 block">
                  {loanCurrency === 'CRC' ? '₡' : loanCurrency === 'USD' ? '$' : '€'}
                  {totals.totalPayment.toLocaleString()} {loanCurrency}
                </span>
                <span className="text-[8px] font-mono text-stone-500">
                  * Amortización capital + intereses totales
                </span>
              </div>
            </div>

            {/* AMORTIZATION CHART & BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* INTERACTIVE CHART: VISUALIZATION OF DEBT SCHEDULE (LG: 5/12) */}
              <div className="lg:col-span-5 bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between space-y-4">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block border-b border-stone-900 pb-1.5">
                  📈 GRÁFICO DE AMORTIZACIÓN (SVG DINÁMICO)
                </span>

                {/* SVG CHART */}
                <div className="relative w-full h-44 bg-stone-900/60 rounded-lg p-2 flex items-center justify-center border border-stone-850">
                  <svg viewBox="0 0 300 150" className="w-full h-full">
                    {/* Background Grids */}
                    <line x1="30" y1="20" x2="280" y2="20" stroke="#1c1917" strokeWidth="1" strokeDasharray="3" />
                    <line x1="30" y1="60" x2="280" y2="60" stroke="#1c1917" strokeWidth="1" strokeDasharray="3" />
                    <line x1="30" y1="100" x2="280" y2="100" stroke="#1c1917" strokeWidth="1" strokeDasharray="3" />
                    <line x1="30" y1="130" x2="280" y2="130" stroke="#292524" strokeWidth="1" />

                    {/* Chart Axes */}
                    <line x1="30" y1="10" x2="30" y2="130" stroke="#44403c" strokeWidth="1.5" />
                    <line x1="30" y1="130" x2="290" y2="130" stroke="#44403c" strokeWidth="1.5" />

                    {/* Data Paths */}
                    {amortizationSchedule.length > 0 && (() => {
                      const totalM = amortizationSchedule.length;
                      const maxB = loanAmount;
                      const pointsBalance = amortizationSchedule.map((row, idx) => {
                        const x = 30 + (idx / (totalM - 1)) * 250;
                        const y = 130 - (row.balance / maxB) * 110;
                        return `${x},${y}`;
                      }).join(' ');

                      const pointsInterest = amortizationSchedule.map((row, idx) => {
                        const x = 30 + (idx / (totalM - 1)) * 250;
                        const y = 130 - (row.interest / (amortizationSchedule[0].interest || 1)) * 50;
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <>
                          {/* Balance Line (Emerald) */}
                          <polyline
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            points={pointsBalance}
                          />
                          {/* Interest line (Rose) */}
                          <polyline
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="1.5"
                            strokeDasharray="4"
                            points={pointsInterest}
                          />
                          
                          {/* Points labels */}
                          <text x="35" y="35" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace">Saldo Pendiente</text>
                          <text x="35" y="47" fill="#f43f5e" fontSize="7" fontWeight="bold" fontFamily="monospace">Interés Mensual</text>

                          {/* Time indicators */}
                          <text x="30" y="142" fill="#78716c" fontSize="7" fontFamily="monospace">Mes 1</text>
                          <text x="145" y="142" fill="#78716c" fontSize="7" fontFamily="monospace">Plazo Medio</text>
                          <text x="260" y="142" fill="#78716c" fontSize="7" fontFamily="monospace">Mes {totalM}</text>
                        </>
                      );
                    })()}
                  </svg>
                </div>

                <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-850 text-[10px] leading-relaxed text-stone-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span><strong>Saldo (Línea Continua):</strong> Muestra el amortizamiento progresivo del saldo adeudado mes a mes.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 inline-block border border-dashed border-rose-300" />
                    <span><strong>Interés (Línea Discontinua):</strong> Comportamiento de cobro de intereses. Disminuye a medida que el saldo capital baja.</span>
                  </div>
                </div>
              </div>

              {/* DETAILED MONTH BY MONTH TABLE (LG: 7/12) */}
              <div className="lg:col-span-7 bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col space-y-3">
                <div className="flex items-center justify-between border-b border-stone-900 pb-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    📋 TABLA DE DESGLOSE DE CUOTAS (SISTEMA {amortizationSystem.toUpperCase()})
                  </span>
                  <span className="text-[9px] font-mono text-stone-500">Monto: {loanAmount.toLocaleString()} {loanCurrency}</span>
                </div>

                <div className="overflow-x-auto max-h-[220px] scrollbar-thin">
                  <table className="w-full text-left font-mono text-[10.5px]">
                    <thead className="bg-stone-900 text-stone-400 font-bold uppercase border-b border-stone-800">
                      <tr>
                        <th className="py-2 px-2 text-center">Mes</th>
                        <th className="py-2 px-2 text-right">Cuota Total</th>
                        <th className="py-2 px-2 text-right">Intereses</th>
                        <th className="py-2 px-2 text-right">Amortización</th>
                        <th className="py-2 px-2 text-right">Saldo Deuda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900 text-stone-300">
                      {amortizationSchedule.slice(0, 12).map((row) => (
                        <tr key={row.month} className="hover:bg-stone-900/40">
                          <td className="py-2 px-2 text-center text-amber-500 font-bold">{row.month}</td>
                          <td className="py-2 px-2 text-right font-bold">{row.payment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          <td className="py-2 px-2 text-right text-rose-400">{row.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          <td className="py-2 px-2 text-right text-emerald-400">{row.amortization.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          <td className="py-2 px-2 text-right opacity-85">{row.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                      {amortizationSchedule.length > 12 && (
                        <tr>
                          <td colSpan={5} className="py-2 text-center text-[9.5px] text-stone-500 italic bg-stone-900/20 font-sans font-bold">
                            ... mostrando las primeras 12 cuotas de {amortizationSchedule.length} meses totales ...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* ALGORITHM COMPARISON TIP */}
                <div className="bg-stone-900/40 p-2.5 rounded-lg border border-stone-850 text-[10px] leading-relaxed text-stone-400">
                  {amortizationSystem === 'french' ? (
                    <p>
                      💡 <strong>Ventaja del Sistema Francés:</strong> Es la preferida por el público porque las cuotas mensuales son perfectamente previsibles y estables desde el inicio. Sin embargo, en los primeros meses la cuota cubre mayormente intereses y poco capital.
                    </p>
                  ) : (
                    <p>
                      💡 <strong>Ventaja del Sistema Alemán:</strong> Paga el capital en cuotas constantes iguales. Permite amortizar la deuda más rápidamente y pagar significativamente menos intereses acumulados a largo plazo, pero la cuota inicial es más alta.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB: RISK SCORING & AML ================== */}
        {activeSubTab === 'risk' && (
          <div className="space-y-5 animate-fadeIn">
            {/* MANUAL ADJUSTMENTS CONTROLS FOR TESTING */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block border-b border-stone-900 pb-1.5">
                ⚙️ PARÁMETROS DE EVALUACIÓN DEL SOLICITANTE
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* INGRESO MENSUAL */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Ingreso Mensual (₡ CRC):</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* DEUDAS ACTUALES */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Deudas Actuales (₡ CRC):</label>
                  <input
                    type="number"
                    value={existingDebts}
                    onChange={(e) => setExistingDebts(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* SCORE DE CENTRAL DE RIESGO */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">FICO Score Central (300-850):</label>
                  <input
                    type="number"
                    min={300}
                    max={850}
                    value={creditBureauScore}
                    onChange={(e) => setCreditBureauScore(Math.min(850, Math.max(300, parseInt(e.target.value) || 0)))}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* NACIONALIDAD DE ORIGEN */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Nacionalidad Cliente:</label>
                  <input
                    type="text"
                    value={clientNationality}
                    onChange={(e) => setClientNationality(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-sans font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* SCORING ENGINE METRICS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* COMPLIANCE CHECKLIST CHECKBOXES (LG: 5/12) */}
              <div className="lg:col-span-5 bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block border-b border-stone-900 pb-1.5">
                  🛡️ LISTA DE CUMPLIMIENTO REGULATORIO (AML/KYC)
                </span>

                <div className="space-y-3 font-sans text-xs">
                  {/* CHECK 1: SCORE */}
                  <div className="flex items-start gap-3 p-2 bg-stone-900/40 rounded-lg border border-stone-850">
                    <span className="text-sm">{riskAssessment.isScoreOk ? '✅' : '❌'}</span>
                    <div>
                      <h5 className="font-bold text-stone-200">Central de Riesgo (Burocrática)</h5>
                      <p className="text-[10px] text-stone-400">Puntaje FICO Favorable (&gt;620). Score actual: {creditBureauScore}</p>
                    </div>
                  </div>

                  {/* CHECK 2: DTI */}
                  <div className="flex items-start gap-3 p-2 bg-stone-900/40 rounded-lg border border-stone-850">
                    <span className="text-sm">{riskAssessment.isDtiOk ? '✅' : '⚠️'}</span>
                    <div>
                      <h5 className="font-bold text-stone-200">Relación Deuda-Ingreso (DTI)</h5>
                      <p className="text-[10px] text-stone-400">Total comprometido mensual: {riskAssessment.dtiRatio}% del ingreso bruto. Umbral prudencial: 40%.</p>
                    </div>
                  </div>

                  {/* CHECK 3: AML RISK */}
                  <div className="flex items-start gap-3 p-2 bg-stone-900/40 rounded-lg border border-stone-850">
                    <span className="text-sm">{riskAssessment.isAmlOk ? '✅' : '❌'}</span>
                    <div>
                      <h5 className="font-bold text-stone-200">Lista Antiterrorismo y Lavado (AML)</h5>
                      <p className="text-[10px] text-stone-400">Comprobación de Personas Expuestas Políticamente y Origen de Fondos Legalizable.</p>
                    </div>
                  </div>
                </div>

                {/* HEURISTIC WARNS */}
                {riskAssessment.amlReasons.length > 0 && (
                  <div className="bg-rose-950/20 p-3 rounded-lg border border-rose-500/20 space-y-2">
                    <span className="text-[9.5px] font-mono text-rose-400 font-black flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" /> REQUERIMIENTOS DE CUMPLIMIENTO Y VALIDACIÓN
                    </span>
                    <ul className="list-disc list-inside text-[10.5px] leading-relaxed text-stone-300 font-mono space-y-1">
                      {riskAssessment.amlReasons.map((reason, idx) => (
                        <li key={idx} className="leading-snug">{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* ENGINE SCORE CARD (LG: 7/12) */}
              <div className="lg:col-span-7 bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between border-b border-stone-900 pb-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    🤖 ANÁLISIS AUTOMATIZADO DEL MOTOR FINTECH (DECISIÓN)
                  </span>
                  <span className="text-[9.5px] font-mono text-stone-500 font-black">LÓGICA SCORECARD</span>
                </div>

                {/* GAUGE PROGRESS BAR */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-400">Puntaje Global de Solvencia:</span>
                    <span className={`font-mono font-black text-sm ${
                      riskAssessment.score >= 70 ? 'text-emerald-400' : riskAssessment.score >= 45 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {riskAssessment.score} / 100 Puntos
                    </span>
                  </div>

                  <div className="w-full bg-stone-900 h-3 rounded-full overflow-hidden border border-stone-800 flex">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        riskAssessment.score >= 70 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : riskAssessment.score >= 45 ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 'bg-gradient-to-r from-rose-600 to-rose-400'
                      }`}
                      style={{ width: `${riskAssessment.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-stone-500">
                    <span>Rechazo Inmediato (&lt;45)</span>
                    <span>Análisis Manual (45-69)</span>
                    <span>Aprobado Auto (&ge;70)</span>
                  </div>
                </div>

                {/* FINAL DECISION STATUS BANNER */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  riskAssessment.decision === 'APROBADO' 
                    ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                    : riskAssessment.decision === 'REVISION_MANUAL'
                    ? 'bg-amber-950/40 border-amber-500/20 text-amber-300'
                    : 'bg-rose-950/40 border-rose-500/20 text-rose-300'
                }`}>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold uppercase block opacity-80">DIAGNÓSTICO DEL SISTEMA</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base">
                        {riskAssessment.decision === 'APROBADO' ? '🟢' : riskAssessment.decision === 'REVISION_MANUAL' ? '🟡' : '🔴'}
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-tight">
                        {riskAssessment.decision === 'APROBADO' 
                          ? 'PRÉSTAMO PRE-APROBADO CON ÉXITO' 
                          : riskAssessment.decision === 'REVISION_MANUAL'
                          ? 'MANDADO A ANÁLISIS MANUAL CUMPLIMIENTO'
                          : 'SISTEMA DECLINA EL CRÉDITO DE INMEDIATO'
                        }
                      </h4>
                    </div>
                    <p className="text-[10px] opacity-80 font-sans max-w-md leading-relaxed">
                      {riskAssessment.decision === 'APROBADO'
                        ? 'El solicitante califica para desembolso directo. Puede proceder a la pestaña "API Router" para emitir los fondos al IBAN destinatario.'
                        : riskAssessment.decision === 'REVISION_MANUAL'
                        ? 'La capacidad de endeudamiento o el score está en el límite prudencial. Requiere confirmación por un analista humano.'
                        : 'El puntaje global de crédito es crítico, incumple la capacidad de endeudamiento mensual máxima (DTI) o tiene bloqueos AML fatales.'
                      }
                    </p>
                  </div>
                </div>

                {/* MAX LOAN CAPACITY SUGGESTION */}
                <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-850 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Capacidad crediticia sugerida:</span>
                  <span className="font-extrabold text-stone-200">
                    ₡{riskAssessment.maxLoanSuggested.toLocaleString()} CRC
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB: BANK API ROUTER & DISBURSEMENT ================== */}
        {activeSubTab === 'api' && (
          <div className="space-y-5 animate-fadeIn">
            {/* ROUTING NETWORK SETTINGS ROW */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block border-b border-stone-900 pb-1.5">
                🌐 CONFIGURACIÓN DEL CANAL DE COMUNICACIÓN INTERBANCARIA
              </span>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* NETWORK APIS */}
                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Red / Protocolo Financiero:</label>
                  <select
                    value={apiNetwork}
                    onChange={(e) => setApiNetwork(e.target.value as 'SINPE' | 'SEPA' | 'FEDWIRE')}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="SINPE">SINPE Móvil (Costa Rica) • CRC</option>
                    <option value="SEPA">SEPA Instant Credit (Europa) • EUR</option>
                    <option value="FEDWIRE">FedWire FedLine ACH (USA) • USD</option>
                  </select>
                </div>

                {/* API FORMAT */}
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Formato del Mensaje:</label>
                  <div className="grid grid-cols-2 gap-1.5 bg-stone-900 p-1 rounded-lg border border-stone-800">
                    <button
                      onClick={() => setApiPayloadFormat('json')}
                      className={`py-1 rounded text-[9px] font-bold cursor-pointer transition-all ${
                        apiPayloadFormat === 'json'
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Open Banking JSON
                    </button>
                    <button
                      onClick={() => setApiPayloadFormat('xml')}
                      className={`py-1 rounded text-[9px] font-bold cursor-pointer transition-all ${
                        apiPayloadFormat === 'xml'
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      ISO 20022 XML
                    </button>
                  </div>
                </div>

                {/* SECURITY WEBHOOK SECRET */}
                <div className="md:col-span-5 space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 block uppercase font-bold">Llave Secreta de Firma Webhook (HMAC Secret):</label>
                  <input
                    type="password"
                    value={apiWebhookSecret}
                    onChange={(e) => setApiWebhookSecret(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* API DESCRIPTIVE PAYLOAD & SIMULATION SPLIT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* CODE PAYLOAD VIEWER (LG: 6/12) */}
              <div className="lg:col-span-6 bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col space-y-3">
                <div className="flex items-center justify-between border-b border-stone-900 pb-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    ⚙️ ESTRUCTURA DEL MENSAJE DE PAGO GENERADO
                  </span>
                  <span className="text-[8.5px] font-mono bg-stone-900 text-stone-500 px-1.5 py-0.5 rounded border border-stone-850 font-bold uppercase">
                    {apiPayloadFormat === 'json' ? 'JSON schema' : 'XML (ISO 20022)'}
                  </span>
                </div>

                {/* API PAYLOAD SCREEN */}
                <div className="bg-stone-900/95 p-3 rounded-lg border border-stone-850 max-h-56 overflow-y-auto font-mono text-[9.5px] leading-relaxed text-stone-300 whitespace-pre scrollbar-thin shadow-inner">
                  {apiPayload}
                </div>

                {/* DYNAMIC CRYPTOGRAPHIC CHECKSUM */}
                <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-850 space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 uppercase font-black">
                    <span>Firma Webhook Generada (HMAC-SHA256):</span>
                    <span className="text-amber-500">SEGURO ✓</span>
                  </div>
                  <div className="text-[9px] font-mono text-amber-400 bg-stone-950 px-2 py-1 rounded border border-stone-850 break-all select-all font-bold">
                    {apiSignature}
                  </div>
                </div>
              </div>

              {/* LIVE TERMINAL LOGGER (LG: 6/12) */}
              <div className="lg:col-span-6 bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between border-b border-stone-900 pb-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> CONSOLA DE DESEMBOLSO INTERBANCARIO
                  </span>
                  <span className="text-[8.5px] font-mono text-stone-500 font-bold uppercase">Consola de depuración</span>
                </div>

                {/* TERMINAL SCREEN */}
                <div className="bg-stone-950 rounded-lg p-3.5 border border-stone-850 min-h-40 max-h-44 overflow-y-auto font-mono text-[9.5px] leading-relaxed text-emerald-400 space-y-1 shadow-inner scrollbar-thin">
                  {routingTerminalLogs.length === 0 ? (
                    <div className="text-stone-500 italic text-center py-10 font-sans">
                      Presione el botón inferior para disparar el flujo de enrutamiento y desembolso del crédito aprobado.
                    </div>
                  ) : (
                    routingTerminalLogs.map((log, idx) => (
                      <div key={idx} className="break-words">{log}</div>
                    ))
                  )}

                  {isRoutingRunning && (
                    <div className="flex items-center gap-1.5 text-stone-400 italic animate-pulse mt-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping inline-block" />
                      <span>Esperando respuesta de liquidación del Banco Central...</span>
                    </div>
                  )}
                </div>

                {/* PROCESS PROGRESS BAR */}
                {isRoutingRunning && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-mono text-stone-400">
                      <span>Procesando comunicación segura:</span>
                      <span className="font-extrabold">{routingProgress}%</span>
                    </div>
                    <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden border border-stone-800">
                      <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${routingProgress}%` }} />
                    </div>
                  </div>
                )}

                {/* BUTTON ACTIONS */}
                <div className="flex gap-2">
                  <button
                    onClick={handleExecuteDisbursement}
                    disabled={isRoutingRunning || riskAssessment.decision === 'RECHAZADO'}
                    className={`w-full font-black text-stone-950 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      riskAssessment.decision === 'RECHAZADO'
                        ? 'bg-stone-800 text-stone-500 border border-stone-850 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    {isRoutingRunning ? 'Transmitiendo...' : 'Ejecutar Enrutamiento / Desembolso'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB: DOUBLE-ENTRY LEDGER HISTORIC ================== */}
        {activeSubTab === 'ledger' && (
          <div className="space-y-5 animate-fadeIn">
            {/* LEDGER INTRO EXPLANATION */}
            <div className="bg-stone-950 p-4.5 rounded-xl border border-stone-850 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">LIBRO MAYOR GENERAL DE PARTIDA DOBLE (ACID COMPLIANT)</span>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  El libro contable principal de un banco utiliza transacciones inmutables de partida doble. Toda transacción requiere un equilibrio matemático idéntico donde los <strong>Débitos = Créditos</strong>. Esto garantiza la auditabilidad del balance financiero y previene de forma matemática la creación o evaporación fantasma de activos.
                </p>
              </div>
            </div>

            {/* LEDGER ACCOUNT ENTRY LOGS TABLE */}
            <div className="bg-stone-950 rounded-xl border border-stone-850 overflow-hidden flex flex-col">
              <div className="bg-stone-900 px-4 py-3 border-b border-stone-850 flex justify-between items-center">
                <span className="text-xs font-black uppercase font-mono tracking-wider text-amber-400">
                  📒 HISTORIAL DE REGISTROS DEL LEDGER PRINCIPAL
                </span>
                <button
                  onClick={() => {
                    if(confirm('¿Desea vaciar el libro contable de simulación?')) {
                      setLedgerLogs([]);
                    }
                  }}
                  className="text-[9.5px] font-mono text-stone-400 hover:text-red-400 cursor-pointer font-bold bg-stone-950 px-2.5 py-1 rounded border border-stone-850 hover:border-red-500/20 transition-all"
                >
                  Vaciar Ledger
                </button>
              </div>

              <div className="overflow-x-auto max-h-[300px]">
                <table className="w-full text-left font-mono text-[10.5px]">
                  <thead className="bg-stone-950 text-stone-400 font-bold uppercase border-b border-stone-850">
                    <tr>
                      <th className="py-2.5 px-3">Fecha y Hora</th>
                      <th className="py-2.5 px-2">Tipo</th>
                      <th className="py-2.5 px-2">Cuenta Débito (Debe)</th>
                      <th className="py-2.5 px-2">Cuenta Crédito (Haber)</th>
                      <th className="py-2.5 px-2 text-right">Monto</th>
                      <th className="py-2.5 px-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900 text-stone-300">
                    {ledgerLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-500 font-sans italic">
                          No hay registros contables en este momento. Desembolse préstamos o realice conversiones de divisas.
                        </td>
                      </tr>
                    ) : (
                      ledgerLogs.map((tx) => (
                        <React.Fragment key={tx.id}>
                          {/* Row 1: Main details */}
                          <tr className="hover:bg-stone-900/40">
                            <td className="py-2.5 px-3 text-stone-400 font-medium">{tx.timestamp}</td>
                            <td className="py-2.5 px-2 font-black text-amber-500 text-[9px]">{tx.type}</td>
                            <td className="py-2.5 px-2 text-rose-400 max-w-[150px] truncate" title={tx.debitAccount}>
                              {tx.debitAccount}
                            </td>
                            <td className="py-2.5 px-2 text-emerald-400 max-w-[150px] truncate" title={tx.creditAccount}>
                              {tx.creditAccount}
                            </td>
                            <td className="py-2.5 px-2 text-right font-black text-stone-100">
                              {tx.currency === 'CRC' ? '₡' : tx.currency === 'USD' ? '$' : '€'}
                              {tx.amount.toLocaleString()}
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                                tx.status === 'CONCILIADO_SINPE'
                                  ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 font-extrabold'
                                  : 'bg-amber-950/40 border-amber-500/20 text-amber-400'
                              }`}>
                                {tx.status === 'CONCILIADO_SINPE' ? 'Conciliado' : 'Aprobado'}
                              </span>
                            </td>
                          </tr>
                          {/* Row 2: Transaction Hash info */}
                          <tr className="bg-stone-950/20 text-[8.5px] text-stone-500 border-b border-stone-900">
                            <td colSpan={6} className="py-1 px-3 break-all font-mono leading-none">
                              🔒 Cryptographic Block Hash: <span className="text-stone-400 font-bold">{tx.txHash}</span> • ID: {tx.id}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB: CARDPAYVIEWMODEL.KT STATEFLOW OBSERVER ================== */}
        {activeSubTab === 'viewmodel' && (
          <div className="space-y-5 animate-fadeIn">
            {/* VIEWMODEL INTRO EXPLANATION */}
            <div className="bg-stone-950 p-4.5 rounded-xl border border-stone-850 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <RefreshCw className="w-5 h-5 animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">CONTROLADOR REACTIVO COMPLETO: CardPayViewModel.kt</span>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  Gestión reactiva de pasarela bancaria. El componente visual se sincroniza automáticamente con el flujo <strong className="text-stone-300">MutableStateFlow</strong> de Kotlin. Puede alternar entre el perfil pre-cargado real del inversionista y limpiar el formulario para rellenarlo con datos reales.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* LEFT COLUMN: INTERACTIVE FORM & VISUAL CARD (LG: 5/12) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-4">
                  <span className="text-[9px] font-mono font-black text-blue-400 uppercase tracking-wider block">💳 TARJETA / SINPE VISTA EN TIEMPO REAL</span>

                  {/* INTERACTIVE CREDIT CARD COMPONENT */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-stone-800 p-4 flex flex-col justify-between text-stone-100 shadow-2xl">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Brand & Chip */}
                    <div className="flex items-center justify-between">
                      {/* Chip */}
                      <div className="w-10 h-7.5 bg-amber-500/10 rounded border border-amber-500/20 flex items-center justify-center relative">
                        <span className="absolute inset-y-0 left-3.5 w-[1px] bg-amber-500/20" />
                        <span className="absolute inset-x-0 top-3 h-[1px] bg-amber-500/20" />
                        <div className="w-3.5 h-2.5 bg-amber-600/30 rounded-sm" />
                      </div>
                      
                      {/* Dynamic Brand Logo */}
                      <span className="font-mono text-xs font-black italic tracking-widest text-blue-400">
                        {cardPayViewModel.stateFlowValue.cardNumber.startsWith('4') ? 'VISA' : 'MASTERCARD'}
                      </span>
                    </div>

                    {/* Card Number */}
                    <div className="font-mono text-base tracking-[0.18em] font-black text-center text-stone-100 py-1">
                      {cardPayViewModel.stateFlowValue.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    {/* Card Holder & Expiry */}
                    <div className="flex items-end justify-between text-[10px] font-mono">
                      <div className="space-y-0.5 truncate max-w-[190px]">
                        <span className="text-[7.5px] text-stone-500 uppercase block tracking-wider">Tarjetahabiente</span>
                        <span className="font-black text-stone-200 uppercase truncate block">
                          {cardPayViewModel.stateFlowValue.cardHolder || 'NOMBRE COMPLETO'}
                        </span>
                      </div>
                      <div className="space-y-0.5 text-right shrink-0">
                        <span className="text-[7.5px] text-stone-500 uppercase block tracking-wider">Vence</span>
                        <span className="font-black text-stone-200">
                          {cardPayViewModel.stateFlowValue.cardExpiry || 'MM/AA'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DATA CONTROLS (THE CORE USER DIRECTIVE) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        cardPayViewModel.clearToZeroAndEmpty();
                      }}
                      className="py-2.5 px-2 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-red-400 text-[10.5px] font-mono font-bold rounded-lg border border-stone-800 hover:border-red-500/20 transition-all cursor-pointer text-center"
                    >
                      🧹 Limpiar Formulario
                    </button>
                    <button
                      onClick={() => {
                        cardPayViewModel.loadPreloadedInvestorProfile();
                      }}
                      className="py-2.5 px-2 bg-blue-600 hover:bg-blue-500 text-white text-[10.5px] font-mono font-bold rounded-lg transition-all cursor-pointer text-center shadow-lg shadow-blue-600/10"
                    >
                      👤 Cargar Inversionista
                    </button>
                  </div>

                  {/* DETAILED FORM INPUTS */}
                  <div className="space-y-2.5 text-left border-t border-stone-900 pt-3.5">
                    <div>
                      <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">Nombre Completo en la Tarjeta</label>
                      <input
                        type="text"
                        value={cardPayViewModel.stateFlowValue.cardHolder}
                        onChange={(e) => cardPayViewModel.updateCardHolder(e.target.value)}
                        className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 uppercase"
                        placeholder="EJ. JUAN PÉREZ / NOMBRE TITULAR"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">Número de Tarjeta</label>
                        <input
                          type="text"
                          value={cardPayViewModel.stateFlowValue.cardNumber}
                          onChange={(e) => cardPayViewModel.updateCardNumber(e.target.value)}
                          className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 font-mono"
                          placeholder="5126 8493 3659 4120"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">Expiración</label>
                          <input
                            type="text"
                            value={cardPayViewModel.stateFlowValue.cardExpiry}
                            onChange={(e) => cardPayViewModel.updateCardExpiry(e.target.value)}
                            className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 font-mono text-center"
                            placeholder="12/30"
                          />
                        </div>
                        <div>
                          <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">CVC</label>
                          <input
                            type="text"
                            value={cardPayViewModel.stateFlowValue.cardCvc}
                            onChange={(e) => cardPayViewModel.updateCardCvc(e.target.value)}
                            className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 font-mono text-center"
                            placeholder="777"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-stone-900 pt-3">
                      <div>
                        <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">Teléfono SINPE Emisor</label>
                        <input
                          type="text"
                          value={cardPayViewModel.stateFlowValue.sinpePhone}
                          onChange={(e) => cardPayViewModel.updateSinpePhone(e.target.value)}
                          className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 font-mono"
                          placeholder="8888-7777"
                        />
                      </div>
                      <div>
                        <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">Referencia SINPE</label>
                        <input
                          type="text"
                          value={cardPayViewModel.stateFlowValue.sinpeReference}
                          onChange={(e) => cardPayViewModel.updateSinpeReference(e.target.value)}
                          className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 font-mono"
                          placeholder="20269948"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[8.5px] font-mono text-stone-500 block uppercase font-bold mb-1">Cuenta IBAN de Destino</label>
                      <input
                        type="text"
                        value={cardPayViewModel.stateFlowValue.ibanAccount}
                        onChange={(e) => cardPayViewModel.updateIbanAccount(e.target.value)}
                        className="w-full bg-stone-900 text-xs p-2 rounded-lg border border-stone-800 text-stone-300 outline-none focus:border-blue-500/50 font-mono"
                        placeholder="CR19015202230006190432"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: KOTLIN CODE BLOCK & STATEFLOW STREAM WATCHER (LG: 7/12) */}
              <div className="lg:col-span-7 space-y-4 text-left">
                {/* ACTIVE STATEFLOW WATCHER */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-3 font-mono text-xs">
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider block">📡 OBSERVADOR DE COROUTINES STATEFLOW (LIVE FLUX)</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-stone-900/60 rounded border border-stone-850 flex items-center justify-between">
                      <span className="text-stone-400">val cardNumber:</span>
                      <strong className="text-blue-400 font-bold">{cardPayViewModel.stateFlowValue.cardNumber}</strong>
                    </div>
                    <div className="p-2.5 bg-stone-900/60 rounded border border-stone-850 flex items-center justify-between">
                      <span className="text-stone-400">val cardHolder:</span>
                      <strong className="text-blue-400 font-bold truncate max-w-[120px]">{cardPayViewModel.stateFlowValue.cardHolder || '""'}</strong>
                    </div>
                    <div className="p-2.5 bg-stone-900/60 rounded border border-stone-850 flex items-center justify-between">
                      <span className="text-stone-400">val cardExpiry:</span>
                      <strong className="text-blue-400 font-bold">{cardPayViewModel.stateFlowValue.cardExpiry}</strong>
                    </div>
                    <div className="p-2.5 bg-stone-900/60 rounded border border-stone-850 flex items-center justify-between">
                      <span className="text-stone-400">val cardCvc:</span>
                      <strong className="text-blue-400 font-bold">{cardPayViewModel.stateFlowValue.cardCvc}</strong>
                    </div>
                    <div className="p-2.5 bg-stone-900/60 rounded border border-stone-850 flex items-center justify-between col-span-1 sm:col-span-2">
                      <span className="text-stone-400">val ibanAccount:</span>
                      <strong className="text-emerald-400 font-bold tracking-wider">{cardPayViewModel.stateFlowValue.ibanAccount}</strong>
                    </div>
                  </div>
                </div>

                {/* FILE CODE DISPLAY */}
                <div className="bg-stone-950 rounded-xl border border-stone-850 overflow-hidden">
                  <div className="bg-stone-900 px-4 py-2.5 border-b border-stone-850 flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase font-mono tracking-wider text-stone-300">
                      📄 CardPayViewModel.kt — Código Fuente Kotlin Limpio
                    </span>
                    <span className="text-[8px] font-mono text-stone-500 uppercase font-black bg-stone-950 px-2 py-0.5 rounded border border-stone-850">
                      Production Mode
                    </span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[10px] leading-relaxed font-mono text-stone-300 bg-stone-950/40 max-h-[260px] overflow-y-auto">
{`package com.fullstack.fintech.presentation

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class CardPayViewModel {
    // --- ESTADOS REACTIVOS (MutableStateFlow) ---
    private val _cardHolder = MutableStateFlow("CLIENTE TITULAR CUENTA")
    val cardHolder: StateFlow<String> = _cardHolder.asStateFlow()

    private val _cardNumber = MutableStateFlow("5126 8493 3659 4120")
    val cardNumber: StateFlow<String> = _cardNumber.asStateFlow()

    private val _cardExpiry = MutableStateFlow("12/30")
    val cardExpiry: StateFlow<String> = _cardExpiry.asStateFlow()

    private val _cardCvc = MutableStateFlow("777")
    val cardCvc: StateFlow<String> = _cardCvc.asStateFlow()

    private val _sinpePhone = MutableStateFlow("8888-7777")
    val sinpePhone: StateFlow<String> = _sinpePhone.asStateFlow()

    private val _sinpeSender = MutableStateFlow("USUARIO REGISTRADO")
    val sinpeSender: StateFlow<String> = _sinpeSender.asStateFlow()

    private val _sinpeReference = MutableStateFlow("20261005")
    val sinpeReference: StateFlow<String> = _sinpeReference.asStateFlow()

    private val _ibanAccount = MutableStateFlow("CR19015202230006190432")
    val ibanAccount: StateFlow<String> = _ibanAccount.asStateFlow()

    /**
     * Limpia los campos simulados a valores vacíos para que sean rellenados
     */
    fun clearToZeroAndEmpty() {
        _cardHolder.value = ""
        _cardNumber.value = ""
        _cardExpiry.value = ""
        _cardCvc.value = ""
        _sinpePhone.value = ""
        _sinpeSender.value = ""
        _sinpeReference.value = ""
        _ibanAccount.value = ""
    }

    /**
     * Carga el perfil pre-cargado real del inversionista
     */
    fun loadPreloadedInvestorProfile() {
        _cardHolder.value = "USUARIO REGISTRADO"
        _cardNumber.value = "5126 8493 3659 4120"
        _cardExpiry.value = "12/30"
        _cardCvc.value = "777"
        _sinpePhone.value = "8888-7777"
        _sinpeSender.value = "USUARIO REGISTRADO"
        _sinpeReference.value = "20261005"
        _ibanAccount.value = "CR19015202230006190432"
    }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER METRIC BANNER */}
      <div className="bg-stone-950 px-4 py-2.5 border-t border-stone-850 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-stone-500 font-mono">
        <div className="flex items-center gap-3">
          <span>⚙️ Estado del Ledger Core: <strong className="text-emerald-500">CONCILIADO & SEGURO</strong></span>
          <span className="hidden sm:inline text-stone-700">•</span>
          <span className="hidden sm:inline">ACID Compliant • v2.6</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAcquisitionModalOpen(true)}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 hover:border-amber-500"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>Ficha de Venta ($50,000 USD)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('ai_executive')}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20 hover:border-amber-500/40"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>Alex Morgan (CFO & Closer 24/7): En línea</span>
          </button>
        </div>
      </div>

      {/* FINTECH ACQUISITION / SALE MODAL */}
      <FintechAcquisitionModal
        isOpen={isAcquisitionModalOpen}
        onClose={() => setIsAcquisitionModalOpen(false)}
      />
    </div>
  );
}
