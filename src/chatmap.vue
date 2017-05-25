<template>
  <div class="map">
    <svg width="100%" height="100%" id="chatmap"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import { colorById }  from './helpers'

  export default {
    data() {
      return {}
    },

    mounted() {
      initMap()
    }
  }

  const initMap = () => {
    let svg = d3.select("svg")
    let width = window.innerWidth - window.innerWidth * 0.3
    let height = window.innerHeight

    let simulation = d3.forceSimulation()
          .force("link", d3.forceLink().distance(77).strength(0.3))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2))

    d3.json("api/graph", function(error, graph) {
      let nodes = graph.nodes
      let links = graph.links
      let nodeById = d3.map(nodes, d => d.id)

      links.forEach((link) => {
        link.source = nodeById.get(link.source.id)
        link.target = nodeById.get(link.target.id)
      })

      let link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
          .attr("stroke-width", d => d.power < 0.1 ? 0.7 : d.power * 7)
          .attr("class", "link")

      let node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended))

      node.append("text")
        .attr("dx", d => scale(d.postsPerDay) + 5)
        .attr("dy", ".35em")
        .text(d => d.title)

      let makeLayers = (n) => {
        for (let i = 0; i < n; i +=1 )
          node.append("circle")
            .attr("r", d => scale(d.postsPerDay) - i * scale(d.postsPerDay) / n)
            .attr("fill", d =>
                  d.tags.length > i ? colorById(d.tags[i]._id) : "white")
            .attr("stroke", d =>
                  d.tags.length > i ? colorById(d.tags[i]._id) : "white")
      }

      makeLayers(3)

      simulation
        .nodes(nodes)
        .on("tick", () => {
          link.attr("d", linkArc)
          node.attr("transform", positionNode)
        })

      simulation
        .force("link")
        .links(links)
    })

    const linkArc = d => {
      let dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy)
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
    }

    const positionNode = d => `translate(${d.x},${d.y})`

    const scale = n => {
      if (n < 27) return 10
      if (n > 8000) return 21
      return Math.cbrt(n)
    }

    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    const dragged = (d) => {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }
</script>

<style>
  .map {
    background-color: #000;
    flex: 1 6 70%;
  }

  .node {
    font-family: 'PT Mono', monospace;
    font-size: 0.9vw;
    stroke: #fff;
    fill: #fff;
  }

  .link {
    fill: none;
    stroke: #333;
  }
</style>

