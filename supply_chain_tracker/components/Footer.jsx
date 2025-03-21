import { Fot1, Fot2 } from "./page";

export default () => {
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-400 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <img src="/logo.jpg" className="w-32" alt="Logo" />
            <p className="max-w-md">
              Experience a new level of transparency and traceability in your
              supply chain, secured by blockchain's immutable ledger
            </p>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex items-center gap-3 sm:block">
              <a href="javascript:void()">
                <Fot1 />
              </a>
              <a href="javascript:void()" className="mt-0 block sm:mt-3">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p>©2025 Gauri Sonawane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};