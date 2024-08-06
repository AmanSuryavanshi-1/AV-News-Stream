import React from 'react'
import GitHubCalendar from 'react-github-calendar';

const GithubCalendar = () => {
  return (
    <div className="p-8 mx-auto my-16 overflow-hidden sm:p-12 max-md:w-screen">
    <h2 className="mb-8 font-serif text-3xl font-bold text-center text-primary-light">
        My GitHub Calendar
    </h2>
    <div className="flex justify-center text-primary-light">
        <GitHubCalendar
            username="AmanSuryavanshi-1"
            blockSize={12}
            blockMargin={5}
            fontSize={16}
            color="#FDDA24"
        />
    </div>
</div>
  )
}

export default GithubCalendar