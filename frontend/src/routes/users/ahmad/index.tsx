import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/ahmad/')({
    component: Ahmad,
})

const Ahmad = () => {
    return <div>Users/Ahmad</div>;
}