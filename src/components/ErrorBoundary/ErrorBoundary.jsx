import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ShopNest error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl">😵</p>
        <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-slate-500">An unexpected error occurred. Please try again.</p>
        <button
          onClick={() => window.location.assign("/")}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700"
        >
          Back to home
        </button>
      </div>
    );
  }
}
