import Home from '@/pages/Home';
import { FC } from 'react'
import { Routes, Route } from "react-router-dom";

interface RouterProps {
    
}
 
const Router: FC<RouterProps> = () => {
    return ( <Routes>
        <Route index path="/" element={<Home />} />
    </Routes> );
}
 
export default Router;