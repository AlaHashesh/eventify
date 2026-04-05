import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
    component: Users,
})

const Users = () => {
    return <div>Users</div>;
}