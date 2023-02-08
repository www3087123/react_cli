import React, { useState } from 'react'
import { ConfigProvider, Button, theme } from 'antd';
const { useToken } = theme

export default function HomePage() {
    const { token } = useToken()
    const [color, setColor] = useState(token.blue)

    return (
        <div>HomePage
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: color,
                    },
                }}
            >
                <Button style={{ backgroundColor: color }} onClick={() => {
                    console.log(token);
                    setColor(token.blue)
                }}>切换蓝色背景</Button>;
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: color,
                    },
                }}
            >
                <Button style={{ backgroundColor: color }} onClick={() => {
                    console.log(token);
                    setColor(token.orange)
                }}>切换橙色背景</Button>;
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: color,
                    },
                }}
            >
                <Button style={{ backgroundColor: color }} onClick={() => {
                    console.log(token);
                    setColor(token.green)
                }}>切换绿色背景</Button>;
            </ConfigProvider>
        </div>
    )
}
