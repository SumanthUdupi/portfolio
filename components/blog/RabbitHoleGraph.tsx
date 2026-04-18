'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type Node = d3.SimulationNodeDatum & { id: string; label: string; current: boolean }
type Link = d3.SimulationLinkDatum<Node> & { source: string; target: string }

type Props = {
  currentSlug: string
  relatedSlugs: string[]
}

export default function RabbitHoleGraph({ currentSlug, relatedSlugs }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const W = svgRef.current.clientWidth || 400
    const H = 200

    const nodes: Node[] = [
      { id: currentSlug, label: currentSlug, current: true },
      ...relatedSlugs.map(s => ({ id: s, label: s, current: false })),
    ]

    const links: Link[] = relatedSlugs.map(s => ({
      source: currentSlug,
      target: s,
    }))

    const svg = d3.select(svgRef.current)
      .attr('width', W)
      .attr('height', H)

    svg.selectAll('*').remove()

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(W / 2, H / 2))

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'var(--color-border)')
      .attr('stroke-width', 1.5)

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        window.location.href = `/blog/${d.id}`
      })

    node.append('circle')
      .attr('r', d => d.current ? 10 : 7)
      .attr('fill', d => d.current ? 'var(--color-accent-teal)' : 'var(--color-surface)')
      .attr('stroke', 'var(--color-border)')
      .attr('stroke-width', 1.5)

    node.append('text')
      .text(d => d.label.slice(0, 16))
      .attr('text-anchor', 'middle')
      .attr('dy', '1.8em')
      .attr('font-size', '9px')
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', 'var(--color-text-secondary)')

    sim.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x ?? 0)
        .attr('y1', d => (d.source as Node).y ?? 0)
        .attr('x2', d => (d.target as Node).x ?? 0)
        .attr('y2', d => (d.target as Node).y ?? 0)

      node.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`)
    })

    return () => { sim.stop() }
  }, [currentSlug, relatedSlugs])

  return <svg ref={svgRef} style={{ width: '100%', height: 200 }} />
}
