import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface D3LineChartProps {
  data: { [key: string]: number | string }[];
  xKey: string;
  yKeys: string[];
  colors?: string[];
  width?: number;
  height?: number;
}

const D3LineChart: React.FC<D3LineChartProps> = ({
  data,
  xKey,
  yKeys,
  colors = ["#5f0f40", "#0f52ba"],
  width = 800,
  height = 500,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!data.length || !ref.current) return;

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create category mapping for X axis if categorical
    const uniqueCategories = Array.from(new Set(data.map((d) => d[xKey] as string)));
    const categoryMap = Object.fromEntries(uniqueCategories.map((key, index) => [key, index]));

    const x = d3
      .scaleLinear()
      .domain([0, uniqueCategories.length - 1])
      .range([0, chartWidth]);

    const yMax = d3.max(data, (d) => Math.max(...yKeys.map((key) => d[key] as number))) ?? 0;

    const y = d3.scaleLinear().domain([0, yMax]).nice().range([chartHeight, 0]);

    // Draw grid
    svg
      .append("g")
      .call(d3.axisLeft(y).tickSize(-chartWidth).tickFormat(() => ""))
      .selectAll("line")
      .attr("stroke", "#ddd")
      .attr("stroke-dasharray", "3,3");

    svg
      .append("g")
      .call(d3.axisBottom(x).tickSize(chartHeight).tickFormat(() => ""))
      .selectAll("line")
      .attr("stroke", "#ddd")
      .attr("stroke-dasharray", "3,3");

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x).tickFormat((d) => uniqueCategories[d as number]));

    // Y Axis
    svg.append("g").call(d3.axisLeft(y));

    // Line generator
    yKeys.forEach((yKey, index) => {
      const line = d3
        .line<{ [key: string]: number | string }>()
        .x((d) => x(categoryMap[d[xKey] as string] ?? 0))
        .y((d) => y(d[yKey] as number));

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colors[index % colors.length])
        .attr("stroke-width", 2)
        .attr("d", line);
    });
  }, [data, xKey, yKeys, colors, width, height]);

  return <div ref={ref} />;
};

export default D3LineChart;
