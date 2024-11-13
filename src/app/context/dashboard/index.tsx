import { ReactNode } from "react";
import { createContext } from "react";

export const DateFilterContext = createContext( {startDate: "", endDate: ""} )

interface filtersType{
    startDate: string,
    endDate: string
}

interface IDateFilterProvider{
    children: ReactNode,
    filters: filtersType
}

export const DateFilterProvider = (props: IDateFilterProvider) => {
    const {children, filters} = props
    const {startDate, endDate} = filters

    return (
      <DateFilterContext.Provider value={{ startDate, endDate }}>
        {children}
      </DateFilterContext.Provider>
    );
  };