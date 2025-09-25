(function() {
    'use strict';
    
    // 1. Funzione per scrivere l'anno corrente
    function setCurrentYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // 2. Funzione per leggere e serializzare gli UTM
    function getUtmParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {};
        
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(param => {
            if (urlParams.has(param)) {
                utmParams[param] = urlParams.get(param);
            }
        });
        
        return utmParams;
    }
    
    function serializeUtmParams(utmParams) {
        if (Object.keys(utmParams).length === 0) return '';
        
        return JSON.stringify(utmParams);
    }
    
    function setUtmField() {
        const utmField = document.getElementById('utm');
        if (utmField) {
            const utmParams = getUtmParams();
            const serializedUtm = serializeUtmParams(utmParams);
            utmField.value = serializedUtm;
        }
    }
    
    // 3. Funzione per gestire la cookie bar
    function showCookieBar() {
        const consent = localStorage.getItem('vd-consent-v1');
        
        if (consent !== null) {
            if (consent === 'granted') {
                enableStats();
            }
            return;
        }
        
        const cookieBar = document.createElement('div');
        cookieBar.className = 'cookiebar';
        cookieBar.id = 'cookiebar';
        cookieBar.innerHTML = `
            <p>Utilizziamo i cookie per migliorare la tua esperienza. Continuando a navigare, accetti il nostro utilizzo dei cookie.</p>
            <div>
                <button id="accept-cookies" class="btn btn-primary">Accetta</button>
                <button id="reject-cookies" class="btn">Rifiuta</button>
            </div>
        `;
        
        document.body.appendChild(cookieBar);
        
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('vd-consent-v1', 'granted');
            document.getElementById('cookiebar').remove();
            enableStats();
        });
        
        document.getElementById('reject-cookies').addEventListener('click', function() {
            localStorage.setItem('vd-consent-v1', 'denied');
            document.getElementById('cookiebar').remove();
        });
    }
    
    // Funzione placeholder per analytics
    function enableStats() {
        // Implementazione futura per iniettare GA4/Matomo
        console.log('Analytics abilitate');
    }
    
    // 4. Funzione per controllare Calendly
    function checkCalendlyWidget() {
        setTimeout(function() {
            const widgetContainer = document.querySelector('.calendly-inline-widget');
            if (widgetContainer) {
                const iframe = widgetContainer.querySelector('iframe');
                const fallback = document.getElementById('calendly-fallback');
                
                if (!iframe && fallback) {
                    fallback.style.display = 'block';
                } else if (iframe && fallback) {
                    fallback.style.display = 'none';
                }
            }
        }, 5000);
    }
    
    // Funzione principale di inizializzazione
    function init() {
        setCurrentYear();
        setUtmField();
        showCookieBar();
        checkCalendlyWidget();
    }
    
    // Esegui l'inizializzazione quando il DOM è pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Esporta funzioni per debug o utilizzo esterno
    window.VDAgency = {
        setCurrentYear,
        getUtmParams,
        serializeUtmParams,
        setUtmField,
        showCookieBar,
        enableStats,
        checkCalendlyWidget
    };
})();