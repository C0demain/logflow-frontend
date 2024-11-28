const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
]

export default function formatMonthlyDate(monthlyDateString: string){
    const [year, rawMonth]: string[] = monthlyDateString.split('-')
    const month = months[Number(rawMonth)-1]

    return [month, year].join('-')
}