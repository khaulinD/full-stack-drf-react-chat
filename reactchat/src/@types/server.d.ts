export interface Server {
    id: number
    channel_server: {
        id: number
        name: string
        topic: string
        owner: number
        server: number
      }[]
    category: string
    name: string
    description:string
    banner: string
    icon: string
    owner: number
}