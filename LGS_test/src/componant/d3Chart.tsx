import * as d3 from "d3";
import { useEffect, useRef } from "react";

const D3LineChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const staticData = [
      { Category: "A", Value1: 30, Value2: 40 },
      { Category: "B", Value1: 70, Value2: 90 },
      { Category: "C", Value1: 50, Value2: 60 },
      { Category: "D", Value1: 20, Value2: 30 },
    ];

    const categoryMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 1060 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    if (ref.current) {
      d3.select(ref.current).selectAll("*").remove();

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleLinear()
        .domain([0, Object.keys(categoryMap).length - 1]) // Map categories to numeric values
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(staticData, (d) => Math.max(d.Value1, d.Value2)) ?? 0])
        .nice()
        .range([height, 0]);

      // Function to get x position
      const xPosition = (d: { Category: string }) =>
        x(categoryMap[d.Category] ?? 0);

      // Draw horizontal grid lines
      svg
        .append("g")
        .attr("class", "grid")
        .call(
          d3
            .axisLeft(y)
            .tickSize(-width)
            .tickFormat(() => "")
        )
        .selectAll("line")
        .attr("stroke", "#ddd")
        .attr("stroke-dasharray", "3,3");

      // Draw vertical grid lines
      svg
        .append("g")
        .attr("class", "grid")
        .call(
          d3
            .axisBottom(x)
            .tickSize(height)
            .tickFormat(() => "")
        )
        .selectAll("line")
        .attr("stroke", "#ddd")
        .attr("stroke-dasharray", "3,3");

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat((d) => Object.keys(categoryMap)[d as number]));

      svg.append("g").call(d3.axisLeft(y));

      const line1 = d3
        .line<{ Category: string; Value1: number; Value2: number }>()
        .x((d) => xPosition(d))
        .y((d) => y(d.Value1));

      const line2 = d3
        .line<{ Category: string; Value1: number; Value2: number }>()
        .x((d) => xPosition(d))
        .y((d) => y(d.Value2));

      svg
        .append("path")
        .datum(staticData)
        .attr("fill", "none")
        .attr("stroke", "#5f0f40")
        .attr("stroke-width", 2)
        .attr("d", line1);

      svg
        .append("path")
        .datum(staticData)
        .attr("fill", "none")
        .attr("stroke", "#0f52ba")
        .attr("stroke-width", 2)
        .attr("d", line2);
    }
  }, []);

  return <div ref={ref} />;
};

export default D3LineChart;
