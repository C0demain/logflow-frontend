export const validarCNPJ = (cnpj: string): boolean => {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    const cnpjRegex = /^\d{14}$/;
    return cnpjRegex.test(cnpjLimpo);
};

export const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validarTelefone = (phone: string): boolean => {
    const phoneLimpo = phone.replace(/\D/g, "");
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneLimpo);
};