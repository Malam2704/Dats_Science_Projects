import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

interface DataPoint {
    city: string;
    count: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
}

const CityBarChart = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const data: DataPoint[] = [
        { city: 'New York', count: 245 },
        { city: 'Dubai', count: 189 },
        { city: 'Shanghai', count: 156 },
        { city: 'Chicago', count: 134 },
        { city: 'Hong Kong', count: 122 },
        { city: 'Toronto', count: 98 },
        { city: 'London', count: 87 },
        { city: 'Singapore', count: 76 },
        { city: 'Tokyo', count: 65 },
        { city: 'Seoul', count: 54 }
    ].sort((a, b) => b.count - a.count);

    const colors = [
        '#00fff2', // Cyan
        '#00e5ff',
        '#00d4ff',
        '#00c3ff',
        '#00b2ff',
        '#00a1ff',
        '#0090ff',
        '#007fff',
        '#006eff',
        '#005dff'
    ];

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900/90 p-4 rounded-lg shadow-lg border border-cyan-500/30 backdrop-blur-sm">
                    <p className="font-bold text-cyan-300">{label}</p>
                    <p className="text-cyan-100">
                        {payload[0].value} posts
                    </p>
                </div>
            );
        }
        return null;
    };

    const handleMouseEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
        <Card className="w-full max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.800/80)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800/80)_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative">
                <CardHeader className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Building2 className="w-6 h-6 text-cyan-400" />
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                            Most Posted Cities in r/skyscrapers
                        </CardTitle>
                    </div>
                    <p className="text-gray-400">Top 10 cities by post frequency</p>
                </CardHeader>
                <CardContent>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                                onMouseMove={(state: any) => {
                                    if (state && state.activeTooltipIndex !== undefined) {
                                        handleMouseEnter(null, state.activeTooltipIndex);
                                    }
                                }}
                                onMouseLeave={handleMouseLeave}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(147, 197, 253, 0.1)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="city"
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    tickLine={{ stroke: '#475569' }}
                                    axisLine={{ stroke: '#475569' }}
                                />
                                <YAxis
                                    label={{
                                        value: 'Number of Posts',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fill: '#94a3b8', fontSize: 12 }
                                    }}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    tickLine={{ stroke: '#475569' }}
                                    axisLine={{ stroke: '#475569' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="count"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={60}
                                >
                                    {data.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colors[index]}
                                            opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                                            className="transition-opacity duration-300"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default CityBarChart;