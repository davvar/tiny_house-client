import React, { createContext, FC, useContext } from 'react'

interface IContext {
	viewer: IViewer
	setViewer: React.Dispatch<React.SetStateAction<IViewer>>
}

const ViewerContext = createContext<IContext>(null as any)


export const useViewer = () => useContext(ViewerContext)
export const ViewerProvider: FC<{ value: IContext }> = ({
	children,
	value,
}) => <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>
