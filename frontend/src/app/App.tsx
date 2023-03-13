import { FC } from 'react'
import Router from '@/routes/Router'
import { BrowserRouter } from 'react-router-dom'

interface AppProps {}

const App: FC<AppProps> = () => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

export default App
