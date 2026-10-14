/**
 * AEGIS ONE - Multilingual Translation System
 * Provides complete strings in EN, HI, ES, FR, and TE.
 */

import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  tagline: string;
  tabs: {
    overview: string;
    sos: string;
    nearby: string;
    guides: string;
    contacts: string;
    simulator: string;
    settings: string;
  };
  header: {
    online: string;
    offline: string;
    locationReady: string;
    locationPrompt: string;
    locationDenied: string;
    installApp: string;
  };
  overview: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    sosQuickLaunch: string;
    sosSubtitle: string;
    systemStatus: string;
    gpsStatus: string;
    offlineReadiness: string;
    profileCompleteness: string;
    primaryContacts: string;
    noContacts: string;
    addContact: string;
    checklistProgress: string;
    checklistSubtitle: string;
    quickTools: string;
    exploreMap: string;
    browseGuides: string;
    launchDrill: string;
  };
  sos: {
    stage1Title: string;
    stage1Subtitle: string;
    stage1Notice: string;
    openEmergencyCenter: string;
    stage2Title: string;
    stage2Notice: string;
    dialEmergency: string;
    dialSubtitle: string;
    callPrimaryContact: string;
    locationSnapshot: string;
    refreshLocation: string;
    shareMessage: string;
    copyMessage: string;
    copied: string;
    messageSentNotice: string;
    audibleBeacon: string;
    sirenAlert: string;
    rescueWhistle: string;
    sosMorseTone: string;
    stopAllAudio: string;
    visualBeacon: string;
    strobeOn: string;
    strobeOff: string;
    cancelEmergency: string;
  };
  nearby: {
    title: string;
    subtitle: string;
    all: string;
    hospitals: string;
    police: string;
    fire: string;
    shelters: string;
    personal: string;
    addCustomLocation: string;
    offlineNotice: string;
    distance: string;
    call: string;
    getDirections: string;
  };
  guides: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    medical: string;
    disaster: string;
    fire: string;
    security: string;
    step: string;
    dos: string;
    donts: string;
    warning: string;
    startCprMetronome: string;
    stopCprMetronome: string;
    cprCadenceNotice: string;
  };
  simulator: {
    title: string;
    subtitle: string;
    drillBanner: string;
    selectDrill: string;
    drillDuration: string;
    startDrill: string;
    inProgress: string;
    completeDrill: string;
    abortDrill: string;
    instructions: string;
    tips: string;
    resultsHistory: string;
    noResults: string;
    score: string;
  };
  settings: {
    title: string;
    subtitle: string;
    emergencyProfile: string;
    fullName: string;
    bloodType: string;
    allergies: string;
    chronicConditions: string;
    medications: string;
    organDonor: string;
    emergencyNotes: string;
    saveProfile: string;
    savedSuccess: string;
    regionalDirectory: string;
    selectRegion: string;
    dataManagement: string;
    exportData: string;
    importData: string;
    resetAll: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    tagline: 'One Tap. One Response. One Step Toward Safety.',
    tabs: {
      overview: 'Overview',
      sos: 'Emergency SOS',
      nearby: 'Nearby Help',
      guides: 'Safety Guides',
      contacts: 'Emergency Contacts',
      simulator: 'Readiness Simulator',
      settings: 'Settings',
    },
    header: {
      online: 'Live / Online',
      offline: 'Offline / Cached',
      locationReady: 'GPS Ready',
      locationPrompt: 'GPS Inactive',
      locationDenied: 'GPS Blocked',
      installApp: 'Install App',
    },
    overview: {
      welcomeTitle: 'Intelligent Emergency Response',
      welcomeSubtitle: 'Autonomous personal safety, verified offline guides, and rapid emergency dispatch.',
      sosQuickLaunch: 'EMERGENCY SOS',
      sosSubtitle: 'Tap to access emergency dialers, GPS sharing, and audio beacons',
      systemStatus: 'System Readiness Status',
      gpsStatus: 'Location Acquisition',
      offlineReadiness: 'Offline Cached Assets',
      profileCompleteness: 'Medical ICE Profile',
      primaryContacts: 'Trusted Emergency Contacts',
      noContacts: 'No emergency contacts added yet. Tap below to configure.',
      addContact: 'Add Trusted Contact',
      checklistProgress: 'Emergency Preparedness Checklist',
      checklistSubtitle: 'Essential supplies and precautions for civil emergencies',
      quickTools: 'Rapid Response Hub',
      exploreMap: 'Interactive Safety Map',
      browseGuides: 'Offline First Aid & Rescue',
      launchDrill: 'Simulated Readiness Drill',
    },
    sos: {
      stage1Title: 'Emergency Assistance Gateway',
      stage1Subtitle: 'Direct, rapid access to life-saving tools and communication.',
      stage1Notice: 'Browser safety rule: Web browsers cannot auto-dial phones silently. This gateway opens verified dialer links, captures precise GPS, and generates structured messages.',
      openEmergencyCenter: 'LAUNCH EMERGENCY COMMAND CENTER',
      stage2Title: 'EMERGENCY COMMAND ACTIVE',
      stage2Notice: 'Select the immediate action needed. Confirm details before dispatch.',
      dialEmergency: 'Call Emergency Services',
      dialSubtitle: 'Opens your device dialer for immediate voice connection',
      callPrimaryContact: 'Call Primary Contact',
      locationSnapshot: 'Verified GPS Location Snapshot',
      refreshLocation: 'Acquire Fresh GPS Coordinates',
      shareMessage: 'Share Emergency Message',
      copyMessage: 'Copy Text to Clipboard',
      copied: 'Emergency message copied to clipboard!',
      messageSentNotice: 'Messages are transmitted via your phone native SMS or sharing apps upon your review.',
      audibleBeacon: 'Acoustic Rescue Beacons',
      sirenAlert: 'High-Decibel Siren',
      rescueWhistle: 'Search & Rescue Whistle',
      sosMorseTone: 'SOS Morse Audio (··· --- ···)',
      stopAllAudio: 'Silence All Audio Beacons',
      visualBeacon: 'Visual Rescue Beacon',
      strobeOn: 'Start Strobe Screen Beacon',
      strobeOff: 'Dismiss Screen Strobe',
      cancelEmergency: 'Exit Emergency Mode',
    },
    nearby: {
      title: 'Nearby Help & Safe Havens',
      subtitle: 'Locate verified emergency facilities and custom saved safe spots.',
      all: 'All Facilities',
      hospitals: 'Hospitals / Trauma',
      police: 'Police Stations',
      fire: 'Fire & Rescue',
      shelters: 'Relief Shelters',
      personal: 'Saved Safe Spots',
      addCustomLocation: 'Save Safe Location',
      offlineNotice: 'Map tiles require internet connection, but all saved locations and coordinates remain fully available offline.',
      distance: 'Distance from you',
      call: 'Call Facility',
      getDirections: 'Route Link',
    },
    guides: {
      title: 'Offline Safety & First Aid Guides',
      subtitle: '100% available offline. Clinically reviewed emergency response protocols.',
      searchPlaceholder: 'Search emergency guide (e.g., CPR, bleeding, earthquake)...',
      allCategories: 'All Protocols',
      medical: 'Medical First Aid',
      disaster: 'Natural Disasters',
      fire: 'Fire & Hazmat',
      security: 'Security & Threats',
      step: 'Step',
      dos: 'Essential Do’s',
      donts: 'Dangerous Don’ts',
      warning: 'Critical Caution',
      startCprMetronome: 'Start 110 BPM Metronome',
      stopCprMetronome: 'Stop CPR Metronome',
      cprCadenceNotice: 'Audio metronome at 110 BPM to pace chest compressions perfectly.',
    },
    simulator: {
      title: 'Emergency Readiness Simulator',
      subtitle: 'Interactive drills and response tests to build instinctive muscle memory.',
      drillBanner: 'SIMULATION / DRILL MODE — NOT A REAL EMERGENCY. No live emergency services will be contacted.',
      selectDrill: 'Select Preparedness Scenario',
      drillDuration: 'Target Duration',
      startDrill: 'Commence Timed Drill',
      inProgress: 'DRILL IN PROGRESS',
      completeDrill: 'Mark Drill Completed',
      abortDrill: 'Abort Exercise',
      instructions: 'Action Sequence Checklist',
      tips: 'Survival Best Practices',
      resultsHistory: 'Simulation History & Readiness Score',
      noResults: 'No drills logged yet. Complete a scenario to calibrate your readiness rating.',
      score: 'Readiness Rating',
    },
    settings: {
      title: 'Settings & Emergency Profile',
      subtitle: 'Configure In Case of Emergency (ICE) health details, regions, and offline data.',
      emergencyProfile: 'Medical In Case of Emergency (ICE) Profile',
      fullName: 'Full Legal Name',
      bloodType: 'Blood Group',
      allergies: 'Severe Allergies (e.g., Penicillin, Peanuts)',
      chronicConditions: 'Chronic Conditions (e.g., Diabetes, Asthma)',
      medications: 'Daily Critical Medications',
      organDonor: 'Registered Organ Donor',
      emergencyNotes: 'Special Rescue or Access Instructions',
      saveProfile: 'Save Profile to Device Storage',
      savedSuccess: 'Profile securely stored locally!',
      regionalDirectory: 'Emergency Dispatch Region',
      selectRegion: 'Default Dispatch Country',
      dataManagement: 'Data Backup & Resiliency',
      exportData: 'Export Backup JSON',
      importData: 'Restore Backup JSON',
      resetAll: 'Reset All Local Data',
    },
  },
  hi: {
    tagline: 'एक टैप। एक प्रतिक्रिया। सुरक्षा की ओर एक कदम।',
    tabs: {
      overview: 'अवलोकन',
      sos: 'आपातकालीन SOS',
      nearby: 'निकटतम सहायता',
      guides: 'सुरक्षा मार्गदर्शिका',
      contacts: 'आपातकालीन संपर्क',
      simulator: 'तैयारी सिम्युलेटर',
      settings: 'सेटिंग्स',
    },
    header: {
      online: 'ऑनलाइन',
      offline: 'ऑफ़लाइन / कैश्ड',
      locationReady: 'GPS तैयार',
      locationPrompt: 'GPS निष्क्रिय',
      locationDenied: 'GPS अवरुद्ध',
      installApp: 'ऐप इंस्टॉल करें',
    },
    overview: {
      welcomeTitle: 'बुद्धिमान आपातकालीन प्रतिक्रिया',
      welcomeSubtitle: 'व्यक्तिगत सुरक्षा, सत्यापित ऑफ़लाइन गाइड और त्वरित आपातकालीन सहायता।',
      sosQuickLaunch: 'आपातकालीन SOS',
      sosSubtitle: 'डायलर्स, GPS शेयरिंग और ऑडियो बीकन के लिए टैप करें',
      systemStatus: 'प्रणाली तत्परता स्थिति',
      gpsStatus: 'स्थान स्थिति',
      offlineReadiness: 'ऑफ़लाइन डेटा उपलब्धता',
      profileCompleteness: 'चिकित्सा ICE प्रोफ़ाइल',
      primaryContacts: 'विश्वसनीय आपातकालीन संपर्क',
      noContacts: 'अभी कोई संपर्क नहीं जोड़ा गया। नीचे टैप करें।',
      addContact: 'विश्वसनीय संपर्क जोड़ें',
      checklistProgress: 'आपातकालीन तैयारी चेकलिस्ट',
      checklistSubtitle: 'नागरिक आपात स्थितियों के लिए आवश्यक सामग्री',
      quickTools: 'त्वरित साधन',
      exploreMap: 'सुरक्षा मानचित्र',
      browseGuides: 'प्राथमिक चिकित्सा गाइड',
      launchDrill: 'सिम्युलेटेड अभ्यास',
    },
    sos: {
      stage1Title: 'आपातकालीन सहायता गेटवे',
      stage1Subtitle: 'जीवन रक्षक उपकरणों और संचार तक त्वरित पहुंच।',
      stage1Notice: 'ब्राउज़र सुरक्षा नियम: ब्राउज़र स्वचालित रूप से कॉल नहीं कर सकते। यह गेटवे सत्यापित डायलर खोलता है और सटीक GPS रिकॉर्ड करता है।',
      openEmergencyCenter: 'आपातकालीन केंद्र खोलें',
      stage2Title: 'आपातकालीन कमांड सक्रिय',
      stage2Notice: 'आवश्यक तत्काल कार्रवाई चुनें। प्रेषण से पहले विवरण सत्यापित करें।',
      dialEmergency: 'आपातकालीन सेवाओं को कॉल करें (112)',
      dialSubtitle: 'तत्काल वॉयस कॉल के लिए फ़ोन डायलर खोलें',
      callPrimaryContact: 'प्राथमिक संपर्क को कॉल करें',
      locationSnapshot: 'सत्यापित GPS स्थान',
      refreshLocation: 'नया GPS स्थान प्राप्त करें',
      shareMessage: 'आपातकालीन संदेश साझा करें',
      copyMessage: 'संदेश कॉपी करें',
      copied: 'संदेश क्लिपबोर्ड पर कॉपी किया गया!',
      messageSentNotice: 'संदेश आपके डिवाइस के SMS या ऐप्स के माध्यम से भेजे जाते हैं।',
      audibleBeacon: 'ध्वनि बचाव बीकन',
      sirenAlert: 'तेज़ सायरन',
      rescueWhistle: 'खोज और बचाव सीटी',
      sosMorseTone: 'SOS मोर्स टोन',
      stopAllAudio: 'सभी ध्वनियां बंद करें',
      visualBeacon: 'दृश्यमान बचाव बीकन',
      strobeOn: 'स्ट्रोब स्क्रीन बीकन शुरू करें',
      strobeOff: 'स्ट्रोब बंद करें',
      cancelEmergency: 'आपातकालीन मोड से बाहर निकलें',
    },
    nearby: {
      title: 'निकटतम सहायता और सुरक्षित स्थान',
      subtitle: 'सत्यापित आपातकालीन सुविधाएं और अपने सुरक्षित स्थान खोजें।',
      all: 'सभी सुविधाएं',
      hospitals: 'अस्पताल / ट्रॉमा',
      police: 'पुलिस स्टेशन',
      fire: 'अग्निशमन केंद्र',
      shelters: 'राहत शिविर',
      personal: 'सहेजे गए स्थान',
      addCustomLocation: 'सुरक्षित स्थान जोड़ें',
      offlineNotice: 'मानचित्र टाइल्स के लिए इंटरनेट चाहिए, लेकिन सभी सहेजे गए स्थान ऑफ़लाइन उपलब्ध हैं।',
      distance: 'आपसे दूरी',
      call: 'सुविधा को कॉल करें',
      getDirections: 'मार्ग लिंक',
    },
    guides: {
      title: 'ऑफ़लाइन सुरक्षा और प्राथमिक चिकित्सा गाइड',
      subtitle: '100% ऑफ़लाइन उपलब्ध। चिकित्सकीय रूप से समीक्षित आपातकालीन निर्देश।',
      searchPlaceholder: 'गाइड खोजें (उदा. CPR, रक्तस्राव, भूकंप)...',
      allCategories: 'सभी श्रेणियां',
      medical: 'प्राथमिक चिकित्सा',
      disaster: 'प्राकृतिक आपदाएं',
      fire: 'आग और धुआं',
      security: 'सुरक्षा और खतरे',
      step: 'चरण',
      dos: 'क्या करें',
      donts: 'क्या न करें',
      warning: 'चेतावनी',
      startCprMetronome: '110 BPM मेट्रोनोम शुरू करें',
      stopCprMetronome: 'मेट्रोनोम बंद करें',
      cprCadenceNotice: 'छाती संपीड़न की गति बनाए रखने के लिए 110 BPM ऑडियो मेट्रोनोम।',
    },
    simulator: {
      title: 'आपातकालीन तत्परता सिम्युलेटर',
      subtitle: 'प्रतिक्रिया समय सुधारने के लिए इंटरैक्टिव अभ्यास।',
      drillBanner: 'सिम्युलेशन मोड — यह वास्तविक आपात स्थिति नहीं है। किसी आपातकालीन सेवा को कॉल नहीं किया जाएगा।',
      selectDrill: 'परिदृश्य चुनें',
      drillDuration: 'लक्ष्य अवधि',
      startDrill: 'अभ्यास शुरू करें',
      inProgress: 'अभ्यास जारी है',
      completeDrill: 'अभ्यास पूरा हुआ',
      abortDrill: 'अभ्यास रद्द करें',
      instructions: 'कार्रवाई चेकलिस्ट',
      tips: 'सुरक्षा सुझाव',
      resultsHistory: 'सिम्युलेशन इतिहास और स्कोर',
      noResults: 'अभी तक कोई अभ्यास दर्ज नहीं किया गया।',
      score: 'तत्परता स्कोर',
    },
    settings: {
      title: 'सेटिंग्स और आपातकालीन प्रोफ़ाइल',
      subtitle: 'चिकित्सा ICE विवरण, क्षेत्र और ऑफ़लाइन डेटा प्रबंधित करें।',
      emergencyProfile: 'चिकित्सा आपातकालीन (ICE) प्रोफ़ाइल',
      fullName: 'पूरा कानूनी नाम',
      bloodType: 'रक्त समूह',
      allergies: 'गंभीर एलर्जी',
      chronicConditions: 'दीर्घकालिक बीमारियां',
      medications: 'दैनिक दवाएं',
      organDonor: 'पंजीकृत अंग दाता',
      emergencyNotes: 'विशेष निर्देश',
      saveProfile: 'प्रोफ़ाइल सहेजें',
      savedSuccess: 'प्रोफ़ाइल सुरक्षित रूप से सहेजी गई!',
      regionalDirectory: 'आपातकालीन क्षेत्र',
      selectRegion: 'डिफ़ॉल्ट देश',
      dataManagement: 'डेटा बैकअप',
      exportData: 'बैकअप JSON निर्यात करें',
      importData: 'बैकअप JSON आयात करें',
      resetAll: 'सभी डेटा रीसेट करें',
    },
  },
  es: {
    tagline: 'Un Toque. Una Respuesta. Un Paso Hacia la Seguridad.',
    tabs: {
      overview: 'Resumen',
      sos: 'SOS de Emergencia',
      nearby: 'Ayuda Cercana',
      guides: 'Guías de Seguridad',
      contacts: 'Contactos',
      simulator: 'Simulador',
      settings: 'Ajustes',
    },
    header: {
      online: 'En Línea',
      offline: 'Fuera de Línea / Caché',
      locationReady: 'GPS Listo',
      locationPrompt: 'GPS Inactivo',
      locationDenied: 'GPS Bloqueado',
      installApp: 'Instalar App',
    },
    overview: {
      welcomeTitle: 'Respuesta Inteligente ante Emergencias',
      welcomeSubtitle: 'Seguridad personal, guías sin conexión y acceso rápido a socorristas.',
      sosQuickLaunch: 'SOS DE EMERGENCIA',
      sosSubtitle: 'Toque para acceder a marcadores, GPS y balizas audibles',
      systemStatus: 'Estado del Sistema',
      gpsStatus: 'Estado de Ubicación',
      offlineReadiness: 'Disponibilidad Sin Conexión',
      profileCompleteness: 'Perfil Médico ICE',
      primaryContacts: 'Contactos de Confianza',
      noContacts: 'No hay contactos aún. Configure abajo.',
      addContact: 'Añadir Contacto',
      checklistProgress: 'Lista de Preparación',
      checklistSubtitle: 'Suministros esenciales para emergencias civiles',
      quickTools: 'Herramientas Rápidas',
      exploreMap: 'Mapa de Seguridad',
      browseGuides: 'Primeros Auxilios',
      launchDrill: 'Simulacro Programado',
    },
    sos: {
      stage1Title: 'Portal de Emergencia',
      stage1Subtitle: 'Acceso directo a herramientas de salvamento.',
      stage1Notice: 'Regla del navegador: La web no puede llamar automáticamente sin confirmación. Abre marcadores y registra GPS verificado.',
      openEmergencyCenter: 'ABRIR CENTRO DE EMERGENCIA',
      stage2Title: 'MANDO DE EMERGENCIA ACTIVO',
      stage2Notice: 'Seleccione la acción requerida. Confirme detalles antes de despachar.',
      dialEmergency: 'Llamar a Emergencias (112 / 911)',
      dialSubtitle: 'Abre el marcador para conexión de voz inmediata',
      callPrimaryContact: 'Llamar Contacto Principal',
      locationSnapshot: 'Instantánea de Coordenadas GPS',
      refreshLocation: 'Actualizar GPS',
      shareMessage: 'Compartir Mensaje',
      copyMessage: 'Copiar Mensaje al Portapapeles',
      copied: '¡Mensaje copiado al portapapeles!',
      messageSentNotice: 'Los mensajes se transmiten a través de SMS o apps tras su revisión.',
      audibleBeacon: 'Balizas Acústicas de Rescate',
      sirenAlert: 'Sirena Potente',
      rescueWhistle: 'Silbato de Búsqueda',
      sosMorseTone: 'Tono Morse SOS',
      stopAllAudio: 'Detener Sonidos',
      visualBeacon: 'Baliza Visual',
      strobeOn: 'Activar Pantalla Estroboscópica',
      strobeOff: 'Desactivar Estroboscopio',
      cancelEmergency: 'Salir de Modo Emergencia',
    },
    nearby: {
      title: 'Ayuda Cercana y Zonas Seguras',
      subtitle: 'Encuentre hospitales, policía, bomberos y refugios.',
      all: 'Todos',
      hospitals: 'Hospitales',
      police: 'Policía',
      fire: 'Bomberos',
      shelters: 'Refugios',
      personal: 'Zonas Guardadas',
      addCustomLocation: 'Guardar Zona Segura',
      offlineNotice: 'Los azulejos del mapa requieren red, pero las ubicaciones guardadas funcionan sin conexión.',
      distance: 'Distancia',
      call: 'Llamar',
      getDirections: 'Ruta',
    },
    guides: {
      title: 'Guías de Primeros Auxilios y Seguridad',
      subtitle: '100% disponibles sin conexión a internet.',
      searchPlaceholder: 'Buscar guía (ej. RCP, hemorragia, terremoto)...',
      allCategories: 'Todas',
      medical: 'Médico',
      disaster: 'Desastres',
      fire: 'Incendios',
      security: 'Seguridad',
      step: 'Paso',
      dos: 'Qué hacer',
      donts: 'Qué evitar',
      warning: 'Advertencia',
      startCprMetronome: 'Iniciar Metrónomo 110 BPM',
      stopCprMetronome: 'Detener Metrónomo',
      cprCadenceNotice: 'Metrónomo sonoro a 110 BPM para el ritmo de compresiones torácicas.',
    },
    simulator: {
      title: 'Simulador de Preparación',
      subtitle: 'Ejercicios interactivos para desarrollar reflejos vitales.',
      drillBanner: 'MODO SIMULACIÓN — NO ES UNA EMERGENCIA REAL. No se contactará a servicios de emergencia.',
      selectDrill: 'Seleccionar Escenario',
      drillDuration: 'Duración Estimada',
      startDrill: 'Comenzar Simulacro',
      inProgress: 'SIMULACRO EN CURSO',
      completeDrill: 'Completar Ejercicio',
      abortDrill: 'Abortar',
      instructions: 'Instrucciones Paso a Paso',
      tips: 'Consejos de Supervivencia',
      resultsHistory: 'Historial y Puntuación',
      noResults: 'No hay simulacros completados todavía.',
      score: 'Puntaje de Preparación',
    },
    settings: {
      title: 'Ajustes y Perfil Médico',
      subtitle: 'Configure datos de emergencia (ICE) y respaldos sin conexión.',
      emergencyProfile: 'Perfil Médico de Emergencia (ICE)',
      fullName: 'Nombre Completo',
      bloodType: 'Grupo Sanguíneo',
      allergies: 'Alergias Severas',
      chronicConditions: 'Condiciones Crónicas',
      medications: 'Medicamentos Vitales',
      organDonor: 'Donante de Órganos',
      emergencyNotes: 'Notas Especiales de Rescate',
      saveProfile: 'Guardar Perfil',
      savedSuccess: '¡Perfil guardado en almacenamiento local!',
      regionalDirectory: 'Región de Emergencia',
      selectRegion: 'País Predeterminado',
      dataManagement: 'Gestión de Datos',
      exportData: 'Exportar Copia JSON',
      importData: 'Importar Copia JSON',
      resetAll: 'Restablecer Todo',
    },
  },
  fr: {
    tagline: 'Une Touche. Une Réponse. Un Pas Vers la Sécurité.',
    tabs: {
      overview: 'Aperçu',
      sos: 'SOS Urgence',
      nearby: 'Aide Proche',
      guides: 'Guides Secours',
      contacts: 'Contacts',
      simulator: 'Simulateur',
      settings: 'Paramètres',
    },
    header: {
      online: 'En Ligne',
      offline: 'Hors Ligne / Caché',
      locationReady: 'GPS Prêt',
      locationPrompt: 'GPS Inactif',
      locationDenied: 'GPS Bloqué',
      installApp: 'Installer App',
    },
    overview: {
      welcomeTitle: 'Réponse d’Urgence Intelligente',
      welcomeSubtitle: 'Sécurité personnelle, guides hors ligne certifiés et intervention rapide.',
      sosQuickLaunch: 'SOS URGENCE',
      sosSubtitle: 'Accès rapide aux numéros d’urgence, balise GPS et alertes sonores',
      systemStatus: 'État de Préparation',
      gpsStatus: 'Signal GPS',
      offlineReadiness: 'Ressources Hors Ligne',
      profileCompleteness: 'Profil Médical ICE',
      primaryContacts: 'Contacts de Confiance',
      noContacts: 'Aucun contact enregistré pour le moment.',
      addContact: 'Ajouter un Contact',
      checklistProgress: 'Checklist de Préparation',
      checklistSubtitle: 'Matériel essentiel pour situations de crise',
      quickTools: 'Outils Rapides',
      exploreMap: 'Carte de Sécurité',
      browseGuides: 'Premiers Secours',
      launchDrill: 'Simulateur d’Exercice',
    },
    sos: {
      stage1Title: 'Portail d’Urgence',
      stage1Subtitle: 'Accès direct aux outils de sauvetage.',
      stage1Notice: 'Règle navigateur: Les applications web ne peuvent composer un appel sans confirmation. Ce portail ouvre le composeur et relève les coordonnées GPS.',
      openEmergencyCenter: 'OUVRIR LE CENTRE D’URGENCE',
      stage2Title: 'COMMANDE D’URGENCE ACTIVE',
      stage2Notice: 'Choisissez l’action requise. Vérifiez les informations avant l’envoi.',
      dialEmergency: 'Appeler les Secours (112)',
      dialSubtitle: 'Ouvre le composeur de votre téléphone',
      callPrimaryContact: 'Appeler Contact Principal',
      locationSnapshot: 'Coordonnées GPS Vérifiées',
      refreshLocation: 'Actualiser GPS',
      shareMessage: 'Partager le Message',
      copyMessage: 'Copier dans le Presse-Papier',
      copied: 'Message copié dans le presse-papier !',
      messageSentNotice: 'Les messages sont envoyés via SMS ou applications natives après validation.',
      audibleBeacon: 'Balises Sonores de Détresse',
      sirenAlert: 'Sirène d’Alerte',
      rescueWhistle: 'Sifflet de Secours',
      sosMorseTone: 'Signal Morse SOS',
      stopAllAudio: 'Arrêter Tout le Son',
      visualBeacon: 'Balise Lumineuse',
      strobeOn: 'Lancer Écran Stroboscopique',
      strobeOff: 'Arrêter Stroboscope',
      cancelEmergency: 'Quitter Mode Urgence',
    },
    nearby: {
      title: 'Aide à Proximité & Lieux Sûrs',
      subtitle: 'Trouvez hôpitaux, commissariats, casernes et refuges.',
      all: 'Tous',
      hospitals: 'Hôpitaux',
      police: 'Police',
      fire: 'Pompiers',
      shelters: 'Refuges',
      personal: 'Lieux Enregistrés',
      addCustomLocation: 'Ajouter un Lieu Sûr',
      offlineNotice: 'La carte nécessite internet mais vos repères enregistrés sont accessibles hors ligne.',
      distance: 'Distance',
      call: 'Appeler',
      getDirections: 'Itinéraire',
    },
    guides: {
      title: 'Guides de Secours et Premiers Soins',
      subtitle: '100% fonctionnels hors ligne sans connexion internet.',
      searchPlaceholder: 'Rechercher un guide (ex: RCP, hémorragie, séisme)...',
      allCategories: 'Toutes Catégories',
      medical: 'Médical',
      disaster: 'Catastrophes',
      fire: 'Incendie',
      security: 'Sécurité',
      step: 'Étape',
      dos: 'À Faire',
      donts: 'À Éviter',
      warning: 'Attention',
      startCprMetronome: 'Démarrer Métronome 110 BPM',
      stopCprMetronome: 'Arrêter Métronome',
      cprCadenceNotice: 'Rythme audio à 110 BPM pour caler les compressions thoraciques.',
    },
    simulator: {
      title: 'Simulateur d’Entraînement',
      subtitle: 'Exercices immersifs pour développer les bons réflexes.',
      drillBanner: 'MODE SIMULATION — CECI N’EST PAS UNE URGENCE RÉELLE. Aucun service d’urgence ne sera contacté.',
      selectDrill: 'Choisir le Scénario',
      drillDuration: 'Durée Cible',
      startDrill: 'Démarrer l’Exercice',
      inProgress: 'EXERCICE EN COURS',
      completeDrill: 'Valider l’Exercice',
      abortDrill: 'Interrompre',
      instructions: 'Procédure Pas à Pas',
      tips: 'Conseils Clés',
      resultsHistory: 'Historique des Simulations',
      noResults: 'Aucun exercice enregistré pour le moment.',
      score: 'Indice de Préparation',
    },
    settings: {
      title: 'Paramètres & Profil Médical',
      subtitle: 'Détails médicaux d’urgence (ICE), région et données hors ligne.',
      emergencyProfile: 'Fiche Médicale d’Urgence (ICE)',
      fullName: 'Nom Complet',
      bloodType: 'Groupe Sanguin',
      allergies: 'Allergies Majeures',
      chronicConditions: 'Pathologies Chroniques',
      medications: 'Traitements en Cours',
      organDonor: 'Donneur d’Organes',
      emergencyNotes: 'Instructions Particulières',
      saveProfile: 'Enregistrer la Fiche',
      savedSuccess: 'Fiche médicale sauvegardée localement !',
      regionalDirectory: 'Région d’Urgence',
      selectRegion: 'Pays par Défaut',
      dataManagement: 'Sauvegarde des Données',
      exportData: 'Exporter Sauvegarde JSON',
      importData: 'Importer Sauvegarde JSON',
      resetAll: 'Réinitialiser Tout',
    },
  },
  te: {
    tagline: 'ఒకే ట్యాప్. ఒకే స్పందన. రక్షణ దిశగా ఒక అడుగు.',
    tabs: {
      overview: 'అవలోకనం',
      sos: 'ఎమర్జెన్సీ SOS',
      nearby: 'సమీప సహాయం',
      guides: 'భద్రతా గైడ్లు',
      contacts: 'అత్యవసర కాంటాక్ట్లు',
      simulator: 'సిమ్యులేటర్',
      settings: 'సెట్టింగ్‌లు',
    },
    header: {
      online: 'ఆన్‌లైన్',
      offline: 'ఆఫ్‌లైన్ / కాష్ చేయబడింది',
      locationReady: 'GPS సిద్ధం',
      locationPrompt: 'GPS నిష్క్రియం',
      locationDenied: 'GPS నిరోధించబడింది',
      installApp: 'యాప్ ఇన్‌స్టాల్ చేయండి',
    },
    overview: {
      welcomeTitle: 'తెలివైన అత్యవసర స్పందన వ్యవస్థ',
      welcomeSubtitle: 'వ్యక్తిగత రక్షణ, ధృవీకరించబడిన ఆఫ్‌లైన్ గైడ్లు మరియు తక్షణ అత్యవసర సహాయం.',
      sosQuickLaunch: 'ఎమర్జెన్సీ SOS',
      sosSubtitle: 'డయలర్లు, GPS షేరింగ్ మరియు ఆడియో బీకన్ల కోసం ట్యాప్ చేయండి',
      systemStatus: 'వ్యవస్థ సంసిద్ధత స్థితి',
      gpsStatus: 'స్థాన స్థితి',
      offlineReadiness: 'ఆఫ్‌లైన్ డేటా లభ్యత',
      profileCompleteness: 'మెడికల్ ICE ప్రొఫైల్',
      primaryContacts: 'విశ్వసనీయ అత్యవసర పరిచయాలు',
      noContacts: 'ఇంకా ఎలాంటి కాంటాక్ట్లు జోడించలేదు. క్రింద ట్యాప్ చేయండి.',
      addContact: 'కాంటాక్ట్ జోడించండి',
      checklistProgress: 'సంసిద్ధత చెక్‌లిస్ట్',
      checklistSubtitle: 'పౌర అత్యవసర పరిస్థితులకు అవసరమైన వస్తువులు',
      quickTools: 'త్వరిత సాధనాలు',
      exploreMap: 'భద్రతా పటం',
      browseGuides: 'ప్రథమ చికిత్స గైడ్లు',
      launchDrill: 'సిమ్యులేటెడ్ డ్రిల్',
    },
    sos: {
      stage1Title: 'అత్యవసర సహాయ పోర్టల్',
      stage1Subtitle: 'ప్రాణరక్షణ సాధనాలు మరియు సమాచారానికి తక్షణ ప్రాప్యత.',
      stage1Notice: 'బ్రౌజర్ భద్రతా నిబంధన: బ్రౌజర్లు ఆటోమేటిక్‌గా ఫోన్ కాల్స్ చేయలేవు. ఇది ధృవీకరించిన డయలర్ తెరుస్తుంది మరియు GPS నమోదు చేస్తుంది.',
      openEmergencyCenter: 'ఎమర్జెన్సీ కమాండ్ తెరవండి',
      stage2Title: 'ఎమర్జెన్సీ కమాండ్ యాక్టివ్',
      stage2Notice: 'తక్షణ చర్యను ఎంచుకోండి. పంపే ముందు వివరాలు పరిశీలించండి.',
      dialEmergency: 'అత్యవసర సేవలకు కాల్ చేయండి (112)',
      dialSubtitle: 'వాయిస్ కాల్ కోసం ఫోన్ డయలర్ తెరుస్తుంది',
      callPrimaryContact: 'ముఖ్య పరిచయానికి కాల్ చేయండి',
      locationSnapshot: 'ధృవీకరించబడిన GPS స్థానం',
      refreshLocation: 'తాజా GPS స్థానం పొందండి',
      shareMessage: 'అత్యవసర సందేశం పంచుకోండి',
      copyMessage: 'టెక్స్ట్ కాపీ చేయండి',
      copied: 'సందేశం కాపీ చేయబడింది!',
      messageSentNotice: 'సందేశాలు మీ పరికరం యొక్క SMS లేదా యాప్స్ ద్వారా మాత్రమే పంపబడతాయి.',
      audibleBeacon: 'రక్షణ ఆడియో బీకన్లు',
      sirenAlert: 'పెద్ద సైరన్',
      rescueWhistle: 'రక్షణ ఈల (విజిల్)',
      sosMorseTone: 'SOS మోర్స్ టోన్',
      stopAllAudio: 'అన్ని శబ్దాలను ఆపండి',
      visualBeacon: 'విజువల్ బీకన్',
      strobeOn: 'స్ట్రోబ్ స్క్రీన్ ప్రారంభించండి',
      strobeOff: 'స్ట్రోబ్ ఆపండి',
      cancelEmergency: 'ఎమర్జెన్సీ మోడ్ నుండి నిష్క్రమించండి',
    },
    nearby: {
      title: 'సమీప సహాయం & సురక్షిత ప్రాంతాలు',
      subtitle: 'ఆసుపత్రులు, పోలీస్ స్టేషన్లు మరియు సురక్షిత ప్రదేశాలు.',
      all: 'అన్ని సేవలు',
      hospitals: 'ఆసుపత్రులు',
      police: 'పోలీస్ స్టేషన్లు',
      fire: 'అగ్నిమాపక సేవలు',
      shelters: 'పునరావాస శిబిరాలు',
      personal: 'భద్రపరిచిన ప్రదేశాలు',
      addCustomLocation: 'సురక్షిత ప్రదేశం జోడించండి',
      offlineNotice: 'మ్యాప్ టైల్స్‌కి ఇంటర్నెట్ కావాలి, కానీ సేవించిన ప్రదేశాలు ఆఫ్‌లైన్‌లో అందుబాటులో ఉంటాయి.',
      distance: 'మీ నుండి దూరం',
      call: 'కాల్ చేయండి',
      getDirections: 'రూట్ లింక్',
    },
    guides: {
      title: 'ఆఫ్‌లైన్ భద్రత & ప్రథమ చికిత్స గైడ్లు',
      subtitle: '100% ఇంటర్నెట్ లేకుండా పనిచేస్తాయి.',
      searchPlaceholder: 'గైడ్ శోధించండి (ఉదా. CPR, రక్తస్రావం, భూకంపం)...',
      allCategories: 'అన్ని విభాగాలు',
      medical: 'ప్రథమ చికిత్స',
      disaster: 'సహజ విపత్తులు',
      fire: 'అగ్ని ప్రమాదాలు',
      security: 'భద్రతా రక్షణ',
      step: 'దశ',
      dos: 'చేయవలసినవి',
      donts: 'చేయకూడనివి',
      warning: 'హెచ్చరిక',
      startCprMetronome: '110 BPM మెట్రోనొమ్ ప్రారంభించండి',
      stopCprMetronome: 'మెట్రోనొమ్ ఆపండి',
      cprCadenceNotice: 'CPR గుండె ఒత్తిడి వేగం కోసం 110 BPM ఆడియో సహాయం.',
    },
    simulator: {
      title: 'సంసిద్ధత సిమ్యులేటర్',
      subtitle: 'అత్యవసర స్పందనను మెరుగుపరచడానికి సాధన పరీక్షలు.',
      drillBanner: 'సిమ్యులేషన్ మోడ్ — ఇది నిజమైన అత్యవసర పరిస్థితి కాదు. ఎవరికీ కాల్స్ చేయబడవు.',
      selectDrill: 'పరిస్థితి ఎంచుకోండి',
      drillDuration: 'లక్ష్య సమయం',
      startDrill: 'డ్రిల్ ప్రారంభించండి',
      inProgress: 'డ్రిల్ జరుగుతోంది',
      completeDrill: 'డ్రిల్ పూర్తయింది',
      abortDrill: 'రద్దు చేయండి',
      instructions: 'దశల జాబితా',
      tips: 'రక్షణ సూచనలు',
      resultsHistory: 'సిమ్యులేషన్ చరిత్ర & స్కోరు',
      noResults: 'ఇంకా ఎలాంటి డ్రిల్స్ నమోదు కాలేదు.',
      score: 'సంసిద్ధత రేటింగ్',
    },
    settings: {
      title: 'సెట్టింగ్‌లు & మెడికల్ ప్రొఫైల్',
      subtitle: 'అత్యవసర వైద్య వివరాలు మరియు ఆఫ్‌లైన్ డేటా నిర్వహణ.',
      emergencyProfile: 'మెడికల్ అత్యవసర (ICE) ప్రొఫైల్',
      fullName: 'పూర్తి పేరు',
      bloodType: 'రక్త వర్గం',
      allergies: 'తీవ్రమైన అలర్జీలు',
      chronicConditions: 'దీర్ఘకాలిక సమస్యలు',
      medications: 'వాడుతున్న మందులు',
      organDonor: 'అవయవ దాత',
      emergencyNotes: 'ప్రత్యేక సూచనలు',
      saveProfile: 'ప్రొఫైల్ భద్రపరచండి',
      savedSuccess: 'ప్రొఫైల్ స్థానికంగా భద్రపరచబడింది!',
      regionalDirectory: 'ఎమర్జెన్సీ ప్రాంతం',
      selectRegion: 'డిఫాల్ట్ దేశం',
      dataManagement: 'డేటా బ్యాకప్',
      exportData: 'బ్యాకప్ JSON ఎగుమతి',
      importData: 'బ్యాకప్ JSON దిగుమతి',
      resetAll: 'డేటా మొత్తం రీసెట్ చేయండి',
    },
  },
};
