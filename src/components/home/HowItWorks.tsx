import React from 'react'

const HowItWorks = () => {
  {/* How It Works */}
  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Participating in hackathons on Devnovate is simple and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Register</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Create an account and browse upcoming hackathons to find the perfect fit for your skills and interests.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Form a Team</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Join an existing team or create your own. Collaborate with talented individuals to bring your ideas to life.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Build & Submit</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Develop your project, showcase your innovation, and submit it for evaluation to compete for exciting prizes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks