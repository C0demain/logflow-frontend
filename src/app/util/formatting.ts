export const formatarTelefone = (phone: string): string => {
    const phoneLimpo = phone.replace(/\D/g, "");
    if (phoneLimpo.length === 11) {
        return `(${phoneLimpo.slice(0, 2)}) ${phoneLimpo.slice(2, 7)}-${phoneLimpo.slice(7)}`;
    } else if (phoneLimpo.length === 10) {
        return `(${phoneLimpo.slice(0, 2)}) ${phoneLimpo.slice(2, 6)}-${phoneLimpo.slice(6)}`;
    }
    return phone; 
};

export const formatarCNPJ = (cnpj: string): string => {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (cnpjLimpo.length === 14) {
        return `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5, 8)}/${cnpjLimpo.slice(8, 12)}-${cnpjLimpo.slice(12)}`;
    }
    return cnpj;
};
