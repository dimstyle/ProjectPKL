import { authHandlers } from './handlers/authHandlers'
import { userHandlers } from './handlers/userHandlers'
import { usersHandlers } from './handlers/usersHandlers'
import { postsHandlers } from './handlers/postsHandlers'

export const handler = [
    ...authHandlers,
    ...userHandlers,
    ...usersHandlers,
    ...postsHandlers
]