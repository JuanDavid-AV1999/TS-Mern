import { FC } from 'react'
import { DefaultProps } from '@/types'

interface TemplateProps extends DefaultProps {}

const Template: FC<TemplateProps> = ({ children }) => {
    return <main className="main-content">{children}</main>
}

export default Template
