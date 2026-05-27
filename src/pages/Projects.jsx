import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export const Projects = () => {
  const projects = [
    { id: 1, name: 'Q2 Campaign', status: 'In Progress', leads: 24, revenue: '$8,400' },
    { id: 2, name: 'Brand Overhaul', status: 'Planned', leads: 0, revenue: '$0' },
    { id: 3, name: 'Product Launch', status: 'In Progress', leads: 12, revenue: '$4,200' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Projects</h2>
        <Button variant="primary">+ New Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card key={project.id} className="p-6 cursor-pointer hover:border-[#6366F1]/50">
            <h3 className="font-semibold text-[#F1F5F9] mb-2">{project.name}</h3>
            <div className="space-y-2 text-sm text-[#94A3B8]">
              <div>Status: {project.status}</div>
              <div>Leads: {project.leads}</div>
              <div>Revenue: {project.revenue}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Projects
