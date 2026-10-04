package com.fullstack.fintech.presentation

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * CardPayViewModel - Reactividad Avanzada con Coroutines y StateFlow.
 * 
 * Gestiona el estado y flujo de validación para transacciones con Tarjetas bancarias
 * y transferencias SINPE Móvil de manera 100% reactiva y robusta.
 */
class CardPayViewModel {

    // --- ESTADOS REACTIVOS (MutableStateFlow) ---

    // Estado del Tarjetahabiente (Por defecto pre-cargado con el perfil principal del Inversionista)
    private val _cardHolder = MutableStateFlow("CLIENTE TITULAR CUENTA")
    val cardHolder: StateFlow<String> = _cardHolder.asStateFlow()

    // Número de Tarjeta Bancaria (Iniciado con tarjeta de pruebas sandbox)
    private val _cardNumber = MutableStateFlow("5126 8493 3659 4120")
    val cardNumber: StateFlow<String> = _cardNumber.asStateFlow()

    // Fecha de Expiración (MM/AA)
    private val _cardExpiry = MutableStateFlow("12/30")
    val cardExpiry: StateFlow<String> = _cardExpiry.asStateFlow()

    // Código CVC / CVV de Seguridad
    private val _cardCvc = MutableStateFlow("000")
    val cardCvc: StateFlow<String> = _cardCvc.asStateFlow()

    // Teléfono Emisor SINPE Móvil
    private val _sinpePhone = MutableStateFlow("8888-7777")
    val sinpePhone: StateFlow<String> = _sinpePhone.asStateFlow()

    // Nombre Emisor de la Transferencia
    private val _sinpeSender = MutableStateFlow("USUARIO REGISTRADO")
    val sinpeSender: StateFlow<String> = _sinpeSender.asStateFlow()

    // Número de Comprobante / Referencia Oficial
    private val _sinpeReference = MutableStateFlow("20261005")
    val sinpeReference: StateFlow<String> = _sinpeReference.asStateFlow()

    // Cuenta IBAN de Destino para Depósitos
    private val _ibanAccount = MutableStateFlow("CR19015202230006190432")
    val ibanAccount: StateFlow<String> = _ibanAccount.asStateFlow()

    // Estado general del procesamiento de la pasarela
    private val _isProcessing = MutableStateFlow(false)
    val isProcessing: StateFlow<Boolean> = _isProcessing.asStateFlow()

    // --- ACCIONES Y OPERACIONES ---

    /**
     * Limpia todos los campos a valores vacíos en cero (0000)
     * Cumple con la solicitud de restablecer el estado simulado a ceros completos.
     */
    fun clearToZeroAndEmpty() {
        _cardHolder.value = ""
        _cardNumber.value = "0000 0000 0000 0000"
        _cardExpiry.value = "00/00"
        _cardCvc.value = "000"
        _sinpePhone.value = "0000-0000"
        _sinpeSender.value = ""
        _sinpeReference.value = "0000"
        _ibanAccount.value = "CR00 0000 0000 0000 0000"
    }

    /**
     * Carga el perfil pre-cargado del inversionista corporativo
     */
    fun loadPreloadedInvestorProfile() {
        _cardHolder.value = "USUARIO REGISTRADO"
        _cardNumber.value = "5126 8493 3659 4120"
        _cardExpiry.value = "12/30"
        _cardCvc.value = "777"
        _sinpePhone.value = "8888-7777"
        _sinpeSender.value = "USUARIO REGISTRADO"
        _sinpeReference.value = "20269948"
        _ibanAccount.value = "CR19015202230006190432"
    }

    // --- MÉTODOS DE ACTUALIZACIÓN DEL ESTADO ---

    fun updateCardNumber(newNumber: String) {
        // Formatear o sanitizar número
        val cleanNum = newNumber.replace("\\D".toRegex(), "").take(16)
        val formatted = cleanNum.chunked(4).joinToString(" ")
        _cardNumber.value = formatted
    }

    fun updateCardHolder(name: String) {
        _cardHolder.value = name.uppercase()
    }

    fun updateCardExpiry(expiry: String) {
        _cardExpiry.value = expiry
    }

    fun updateCardCvc(cvc: String) {
        _cardCvc.value = cvc.replace("\\D".toRegex(), "").take(4)
    }

    fun updateSinpePhone(phone: String) {
        _sinpePhone.value = phone
    }

    fun updateSinpeSender(sender: String) {
        _sinpeSender.value = sender
    }

    fun updateSinpeReference(ref: String) {
        _sinpeReference.value = ref
    }
}
