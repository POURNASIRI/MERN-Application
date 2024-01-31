import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function CommentSection({postId}) {

    const{currentUser} = useSelector(state => state.user)
   
  return (
    <div
    className='p-3 max-w-6xl w-full mx-auto'>
        {
            currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>
                        Signed In as:
                    </p>
                    <img className='h-10 w-10 rounded-full object-cover ' src={currentUser.image} alt={currentUser.username} />
                    <Link className='hover:underline text-cyan-600 capitalize italic' to={`/dashboard?tab=profile`}>
                        @{currentUser.username}
                    </Link>
                </div>
            ):
            (
                <div className='text-sm text-teal-500 my-5 text-center '>
                    You must be signed in to comment.
                <Link className='hover:underline text-blue-600 font-bold capitalize italic' to={"/signin"}>
                    Sign In
                </Link>
                </div>
            )
        }
    </div>
  )
}

export default CommentSection