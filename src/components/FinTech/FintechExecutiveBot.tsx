import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  CreditCard, 
  ArrowRight, 
  Zap, 
  Building2, 
  FileText,
  UserCheck,
  Award,
  RefreshCw,
  Clock,
  AlertCircle,
  ShieldAlert,
  Key,
  Lock,
  XCircle,
  Crown,
  CheckCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ProposalData {
  amount: number;
  currency: string;
  termMonths: number;
  monthlyPayment: number;
  interestRate: number;
  purpose: string;
  status: 'PRE_APPROVED' | 'PENDING_MANAGER_APPROVAL' | 'DISBURSED' | 'REJECTED_BY_MANAGER';
  benefits: string[];
  managerApproval?: {
    approvedBy: string;
    approvedAt: string;
    approvalCode: string;
    notes?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  proposal?: ProposalData;
  isActionExecuted?: boolean;
}

interface FintechExecutiveBotProps {
  customer: any;
  balances: { CRC: number; USD: number; EUR: number };
  onDisburseLoan: (amount: number, currency: string, proposal: ProposalData) => void;
  ledgerLogsCount: number;
}

export const FintechExecutiveBot: React.FC<FintechExecutiveBotProps> = ({
  customer,
  balances,
  onDisburseLoan,
  ledgerLogsCount
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `👋 **¡Hola! Soy Alex Morgan**, Director Financiero (CFO) y Jefe de Negocios de **CardPay FinTech Core Ledger**.\n\n🛡️ **CONTROL DUAL & GOBERNANZA BANCARIA (MAKER-CHECKER):**\nEstoy facultado para auditar la bóveda, analizar el scoring SUGEF de **${customer.name}** y estructurar propuestas de financiamiento preferencial.\n\n⚠️ **REGLA DE SEGURIDAD ESTRICTA:** Conforme a las directrices de la institución, **ningún desembolso de dinero puede ejecutarse sin la revisión, visto bueno y autorización formal del Gerente General**.\n\n¿Deseas auditar la liquidez de la bóveda o que estructuremos una propuesta de crédito para someterla a la aprobación de Gerencia?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisbursing, setIsDisbursing] = useState<string | null>(null);
  
  // Manager Authorization Modal State
  const [managerModalProposal, setManagerModalProposal] = useState<{ msgId: string; proposal: ProposalData } | null>(null);
  const [managerPin, setManagerPin] = useState('1234');
  const [managerName, setManagerName] = useState('Dirección General de Riesgo & Crédito (Gerencia General)');
  const [managerNotes, setManagerNotes] = useState('Aprobado de conformidad con la solvencia demostrada y capacidad de pago del cliente.');
  const [managerError, setManagerError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    // Safety check for direct bypass attempts
    const textLower = text.toLowerCase();
    if (
      (textLower.includes('desembolsa') || textLower.includes('paga') || textLower.includes('libera el dinero') || textLower.includes('aprueba el dinero')) &&
      (textLower.includes('sin permiso') || textLower.includes('sin gerente') || textLower.includes('ya mismo') || textLower.includes('directo'))
    ) {
      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const blockMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: `⛔ **ACCESO DENEGADO POR POLÍTICA DE GOBERNANZA BANCARIA:**\n\nComo CFO A.I., **tengo prohibido realizar desembolsos autónomos**. Los protocolos de seguridad financiera exigen estrictamente la **firma digital y autorización del Gerente General** antes de liberar cualquier fondo del Core Ledger.\n\nPor favor solicita la estructuración de la propuesta y sométela al **Despacho de Gerencia General** mediante el panel de autorización.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, blockMsg]);
      if (!textToSend) setInputMessage('');
      return;
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/fintech/ai-executive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          customer: customer,
          ledgerSummary: {
            CRC: balances.CRC,
            USD: balances.USD,
            EUR: balances.EUR,
            activeLoansCRC: 18500000,
            nplRatio: '1.4%'
          },
          history: messages.slice(-5).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text
          }))
        })
      });

      const data = await response.json();

      if (data.success) {
        const botMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: data.reply,
          proposal: data.proposal ? { ...data.proposal, status: 'PENDING_MANAGER_APPROVAL' } : undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);

        if (data.proposal) {
          try {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.85 }
            });
          } catch (e) {}
        }
      } else {
        throw new Error(data.message || 'Error en el servidor de IA');
      }
    } catch (err: any) {
      console.error('Error in chat:', err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: `⚠️ **Aviso del Sistema:** ${err.message || 'Hubo un error de conexión con el Asesor Ejecutivo.'}\n\n*He asegurado la integridad de la bóveda bancaria. Por favor intenta de nuevo.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Open Manager Office Modal
  const handleOpenManagerAuthorization = (msgId: string, proposal: ProposalData) => {
    setManagerModalProposal({ msgId, proposal });
    setManagerError(null);
  };

  // Manager Authorizes Loan
  const handleConfirmManagerAuthorization = () => {
    if (!managerModalProposal) return;
    const { msgId, proposal } = managerModalProposal;

    const validPins = ['1234', 'admin', 'gerencia'];
    if (!validPins.includes(managerPin.trim().toLowerCase())) {
      setManagerError('PIN de Gerencia inválido. Ingrese el código oficial de autorización (1234).');
      return;
    }

    setManagerError(null);
    setIsDisbursing(msgId);
    setManagerModalProposal(null);

    setTimeout(() => {
      const approvalCode = `AUTH-MGR-${Date.now().toString().slice(-6)}`;
      const updatedProposal: ProposalData = {
        ...proposal,
        status: 'DISBURSED',
        managerApproval: {
          approvedBy: managerName,
          approvedAt: new Date().toISOString(),
          approvalCode: approvalCode,
          notes: managerNotes
        }
      };

      // Execute the double entry ledger disbursement in parent
      onDisburseLoan(proposal.amount, proposal.currency, updatedProposal);

      setMessages(prev =>
        prev.map(m =>
          m.id === msgId
            ? { ...m, isActionExecuted: true, proposal: updatedProposal }
            : m
        )
      );

      // Add formal manager sign-off message from bot
      const confirmMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `🏛️ **¡DESEMBOLSO AUTORIZADO FORMALMENTE POR LA GERENCIA GENERAL!**\n\n` +
          `✅ **Autorizado por:** ${managerName}\n` +
          `🔑 **Código de Aprobación Dual:** \`${approvalCode}\`\n` +
          `📋 **Resolución de Gerencia:** "${managerNotes}"\n\n` +
          `💰 **Efecto Contable:**\n` +
          `* Se han acreditado **${proposal.amount.toLocaleString()} ${proposal.currency}** en la cuenta de **${customer.name}**.\n` +
          `* **Core Ledger:** Asiento de partida doble validado con garantía ACID.\n` +
          `* **Notificación Interbancaria:** Liquidación procesada vía SINPE Móvil / FedWire.\n\n` +
          `*La operación ha cumplido con todos los estándares de seguridad y control dual.* 🚀`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, confirmMsg]);
      setIsDisbursing(null);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1400);
  };

  // Manager Rejects Loan
  const handleRejectManagerAuthorization = () => {
    if (!managerModalProposal) return;
    const { msgId, proposal } = managerModalProposal;

    setManagerModalProposal(null);

    const updatedProposal: ProposalData = {
      ...proposal,
      status: 'REJECTED_BY_MANAGER'
    };

    setMessages(prev =>
      prev.map(m =>
        m.id === msgId
          ? { ...m, isActionExecuted: false, proposal: updatedProposal }
          : m
      )
    );

    const rejectMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      text: `🚫 **DESEMBOLSO DENEGADO POR LA GERENCIA GENERAL**\n\n` +
        `La Gerente General (**${managerName}**) ha revisado la propuesta de **${proposal.amount.toLocaleString()} ${proposal.currency}** para **${customer.name}** y ha resuelto **DENEGAR EL DESEMBOLSO** en cumplimiento de los límites de riesgo crediticio.\n\n` +
        `* 🛡️ **Bóveda Bancaria:** Cero afectación al libro contable. Fondos retenidos de forma segura.\n` +
        `* 📑 **Estado de la Solicitud:** Rechazada por Gerencia.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, rejectMsg]);
  };

  const quickPrompts = [
    { label: '🎯 Estructurar Oferta para Gerencia', prompt: `Diseña una propuesta formal de crédito pre-aprobada para ${customer.name} y preséntala para que sea revisada y autorizada por la Gerencia General.` },
    { label: '📊 Auditar Bóveda y Liquidez', prompt: 'Realiza una auditoría formal del Core Ledger: analiza la liquidez actual en colones y dólares, el ratio de activos vs pasivos y la solvencia para originar nuevos préstamos.' },
    { label: '🛡️ Analizar Riesgo SUGEF', prompt: `Evalúa el perfil de riesgo crediticio de ${customer.name}, su nivel de endeudamiento DTI, score y si es apto para un crédito preferencial.` },
    { label: '⚡ Consolidación de Deudas', prompt: `Estructura una propuesta de consolidación de pasivos para ${customer.name} que reduzca sus intereses actuales y unifique sus pagos en una sola cuota mensual.` }
  ];

  return (
    <div className="relative bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[650px]">
      
      {/* ================== MODAL: DESPACHO DE GERENCIA GENERAL ================== */}
      {managerModalProposal && (
        <div className="absolute inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-stone-900 border-2 border-amber-500/70 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4 text-stone-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-white">Despacho de Gerencia General</h4>
                    <span className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                      CONTROL DUAL
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-mono">
                    Autorización y Liberación de Fondos al Core Ledger
                  </p>
                </div>
              </div>
              <button
                onClick={() => setManagerModalProposal(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Governance Info Alert */}
            <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90 font-mono">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold block mb-0.5">Políticas de Seguridad Bancaria Activadas:</strong>
                El Asesor I.A. pre-aprobó la solicitud, pero <strong>ningún fondo puede desembolsarse</strong> sin la firma y el código de seguridad de la Gerencia General.
              </div>
            </div>

            {/* Loan Summary Grid */}
            <div className="grid grid-cols-2 gap-2 bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-xs">
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Cliente Solicitante</span>
                <strong className="text-amber-400 font-bold">{customer.name}</strong>
                <span className="text-[10px] text-stone-500 block font-mono">Score: {customer.creditScore} ({customer.sugefCategory})</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Monto a Desembolsar</span>
                <strong className="text-emerald-400 font-bold font-mono text-sm">
                  {managerModalProposal.proposal.amount.toLocaleString()} {managerModalProposal.proposal.currency}
                </strong>
                <span className="text-[10px] text-stone-500 block font-mono">
                  {managerModalProposal.proposal.termMonths} Meses • {managerModalProposal.proposal.interestRate}% T.E.A.
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-stone-850 flex items-center justify-between font-mono text-[11px]">
                <span className="text-stone-400">Cuota Mensual Pactada:</span>
                <span className="font-bold text-white">
                  {managerModalProposal.proposal.monthlyPayment.toLocaleString()} {managerModalProposal.proposal.currency} / mes
                </span>
              </div>
            </div>

            {/* Manager Inputs */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono text-stone-400 mb-1">
                  Gerente General Responsable:
                </label>
                <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold">
                  <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    className="bg-transparent border-none focus:outline-none w-full text-xs font-mono text-amber-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono text-stone-400">
                    PIN / Clave de Firma Digital de Gerencia:
                  </label>
                  <button
                    type="button"
                    onClick={() => setManagerPin('1234')}
                    className="text-[10px] font-mono text-amber-400 hover:underline cursor-pointer"
                  >
                    Usar PIN Oficial (1234)
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs">
                  <Key className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <input
                    type="password"
                    value={managerPin}
                    onChange={(e) => {
                      setManagerPin(e.target.value);
                      setManagerError(null);
                    }}
                    placeholder="Ingrese PIN de Gerente (ej: 1234)"
                    className="bg-transparent border-none focus:outline-none w-full text-xs font-mono text-white placeholder-stone-600"
                  />
                </div>
                {managerError && (
                  <p className="text-[11px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {managerError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-400 mb-1">
                  Resolución / Notas de Visto Bueno:
                </label>
                <input
                  type="text"
                  value={managerNotes}
                  onChange={(e) => setManagerNotes(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-stone-300 focus:outline-none focus:border-amber-500"
                  placeholder="Comentarios de auditoría o condiciones de aprobación..."
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={handleRejectManagerAuthorization}
                className="w-full sm:w-1/3 py-2.5 px-3 rounded-xl border border-rose-500/40 text-rose-400 hover:bg-rose-950/40 font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Rechazar</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmManagerAuthorization}
                className="w-full sm:w-2/3 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black rounded-xl font-mono text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Autorizar y Liberar Fondos</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER: EXECUTIVE PROFILE & METRICS */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 p-4 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 border border-amber-400/40">
              <Bot className="w-7 h-7" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-stone-950 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white tracking-tight">
                Alex Morgan
              </h3>
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                CFO & ANALISTA FINANCIERO IA
              </span>
            </div>
            <p className="text-xs text-stone-400 font-mono flex items-center gap-2">
              <span>Originador de Crédito & Auditor de Bóveda</span>
              <span className="text-stone-600">•</span>
              <span className="text-amber-400 font-bold">Control Dual Activo</span>
            </p>
          </div>
        </div>

        {/* FINANCIAL HUD BADGE */}
        <div className="flex items-center gap-2 bg-stone-950/80 px-3 py-1.5 rounded-xl border border-stone-800">
          <div className="text-right">
            <div className="text-[9px] font-mono text-stone-400 uppercase">Cliente Analizado</div>
            <div className="text-xs font-bold text-amber-400 truncate max-w-[140px]">{customer.name}</div>
          </div>
          <div className="w-px h-6 bg-stone-800" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-stone-400 uppercase">Score SUGEF</div>
            <div className="text-xs font-mono font-black text-emerald-400">{customer.creditScore} ({customer.sugefCategory})</div>
          </div>
        </div>
      </div>

      {/* QUICK PROMPTS CHIPS */}
      <div className="bg-stone-950/60 px-4 py-2 border-b border-stone-850 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold whitespace-nowrap">
          Acciones Ejecutivas:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 rounded-lg text-xs font-mono whitespace-nowrap transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95 disabled:opacity-50"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES CONTAINER */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-950/40">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 px-1 text-[10px] font-mono text-stone-500">
                {isBot ? (
                  <>
                    <Building2 className="w-3 h-3 text-amber-400" />
                    <span className="font-bold text-stone-400">Alex Morgan (CFO)</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-stone-400">Tú</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isBot
                    ? 'bg-stone-900 border border-stone-800 text-stone-200'
                    : 'bg-amber-600 text-stone-950 font-medium rounded-tr-none'
                }`}
              >
                <div className="whitespace-pre-line prose prose-invert max-w-none text-xs sm:text-sm">
                  {msg.text}
                </div>

                {/* INTERACTIVE PROPOSAL CARD WITH MANAGER AUTHORIZATION REQUIREMENT */}
                {msg.proposal && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/50 border-2 border-amber-500/50 shadow-xl space-y-3 text-stone-200">
                    <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <div>
                          <div className="text-[10px] font-mono text-amber-400 uppercase font-black tracking-wider">
                            ACUERDO DE CRÉDITO FORMAL
                          </div>
                          <div className="text-sm font-black text-white">
                            Propuesta Estructurada por Alex Morgan (CFO)
                          </div>
                        </div>
                      </div>
                      
                      {/* STATUS BADGE */}
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                        msg.isActionExecuted || msg.proposal.status === 'DISBURSED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : msg.proposal.status === 'REJECTED_BY_MANAGER'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                      }`}>
                        {msg.isActionExecuted || msg.proposal.status === 'DISBURSED' ? (
                          <>
                            <CheckCheck className="w-3 h-3" />
                            <span>AUTORIZADO POR GERENCIA</span>
                          </>
                        ) : msg.proposal.status === 'REJECTED_BY_MANAGER' ? (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>DENEGADO POR GERENCIA</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>REQUIERE FIRMA GERENCIAL</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
                      <div>
                        <div className="text-[9px] font-mono text-stone-400 uppercase">Monto Solicitado</div>
                        <div className="text-sm font-black text-amber-400 font-mono">
                          {msg.proposal.amount.toLocaleString()} {msg.proposal.currency}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-stone-400 uppercase">Plazo</div>
                        <div className="text-sm font-black text-white font-mono">
                          {msg.proposal.termMonths} Meses
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-stone-400 uppercase">Tasa Preferencial</div>
                        <div className="text-sm font-black text-emerald-400 font-mono">
                          {msg.proposal.interestRate}% T.E.A.
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-stone-400 uppercase">Cuota Mensual</div>
                        <div className="text-sm font-black text-white font-mono">
                          {msg.proposal.monthlyPayment.toLocaleString()} {msg.proposal.currency}
                        </div>
                      </div>
                    </div>

                    {msg.proposal.benefits && msg.proposal.benefits.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Condiciones Evaluadas:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {msg.proposal.benefits.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5 text-[11px] text-stone-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MANAGER AUTHORIZATION ACTIONS & STATUS */}
                    <div className="pt-2">
                      {msg.isActionExecuted || msg.proposal.status === 'DISBURSED' ? (
                        <div className="w-full py-2.5 px-4 bg-emerald-950/50 border border-emerald-500/50 rounded-xl flex flex-col items-center justify-center gap-1 text-emerald-300 font-mono text-xs">
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCheck className="w-4 h-4 text-emerald-400" />
                            <span>DESEMBOLSO VALIDADO Y REGISTRADO EN CORE LEDGER</span>
                          </div>
                          {msg.proposal.managerApproval && (
                            <span className="text-[10px] text-emerald-400/80">
                              Firma Digital: {msg.proposal.managerApproval.approvedBy} ({msg.proposal.managerApproval.approvalCode})
                            </span>
                          )}
                        </div>
                      ) : msg.proposal.status === 'REJECTED_BY_MANAGER' ? (
                        <div className="w-full py-2.5 px-4 bg-rose-950/40 border border-rose-500/40 rounded-xl text-center flex items-center justify-center gap-2 text-rose-300 font-mono text-xs font-bold">
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Operación Denegada por Resolución de Gerencia General</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-2.5 text-[11px] text-amber-200/90 font-mono flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Control Dual Obligatorio:</strong> El Asesor I.A. no puede desembolsar sin autorización. Por favor abra el despacho de Gerencia para revisar y firmar la orden.
                            </span>
                          </div>

                          <button
                            onClick={() => handleOpenManagerAuthorization(msg.id, msg.proposal!)}
                            disabled={isDisbursing === msg.id}
                            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                          >
                            {isDisbursing === msg.id ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>CONCILIANDO ASIENTO CONTABLE & DESEMBOLSANDO...</span>
                              </>
                            ) : (
                              <>
                                <Crown className="w-4 h-4 fill-current text-stone-950" />
                                <span>SOLICITAR AUTORIZACIÓN DEL GERENTE GENERAL 🏛️</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 p-2 bg-stone-900/60 rounded-xl max-w-sm border border-stone-800 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>Alex Morgan está analizando el Ledger y estructurando la propuesta...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="p-3 bg-stone-950 border-t border-stone-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Pregúntale a Alex Morgan sobre balances, estructurar un crédito o auditar el libro mayor..."
            disabled={isLoading}
            className="flex-1 bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-200 placeholder-stone-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition font-sans"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Control Dual Maker-Checker: Desembolsos protegidos con Visto Bueno Gerencial
          </span>
          <span>Core Ledger ACID</span>
        </div>
      </div>
    </div>
  );
};
