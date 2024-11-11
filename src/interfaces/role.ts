import { Sector } from "@/enums/sector"

export default interface Role{
    id: string
    name: string
    description: string
    sector: Sector
}