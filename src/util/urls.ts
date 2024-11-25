export const ENDPOINTS = {
    CATALOG_TIPO_VISITAS: '/visita/catalogs/GetTipoVisita/index.php',
    CATALOG_TIPO_INGRESO: '/visita/catalogs/GetTipoIngreso/index.php',
    VISITAS: {
        BY_INSTALACION: `/visita/consulta/GetAllByInstalacion/index.php?email={email}&idInstalacion={instalacion}`,
        BY_TYPE: `visita/consulta/GetAllByType/index.php?email={email}&idInstalacion={instalacion}&idTipoVisita={filters}`,
        CREATE: '/visita/crear/index.php',
        UPDATE: '/visita/update/index.php',
        DELETE: '/visita/delete-visita/index.php',
        DELETE_VEHICLE: '/visita/vehicle-delete/index.php',
        DELETE_PEDESTRIAN: '/visita/delete-pedestrian/index.php',
        HISTORIC: '/visita/consulta/GetAllHistoric/index.php',
        BY_UNIQUE_ID: '/visita/consulta/uniqueId/index.php',
        VEHICLES: '/visita/getVisitVehicles/index.php',
    },
    HOME: {
        BANK_DATA: '/instalaciones/get-recinto-bank-data/index.php',
        PAYMENT_REFERENCE: '/instalaciones/reference/index.php',
        ADEUDO: 'users/account-balance/debt/index.php',
        EQUITY: 'users/account-balance/equity/index.php',
    },
    EDO_CTA: {
        LAST: '/Notificaciones/edo-cta/last-edo-cta/index.php',
        RECIBOS_LAST: '/recibos/last-recibo/index.php',
    },
    AVISOS: {
        DATE: '/Notificaciones/avisos/date/index.php',
    },
    USER: {
        PROFILE: '/users/index.php',
        CHANGE_PASSWORD: '/users/change-password/index.php',
    },
}
