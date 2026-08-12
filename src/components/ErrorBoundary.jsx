import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh]">
          <div className="p-6 rounded-full bg-red-900/20 mb-6">
            <AlertTriangle size={48} className="text-red-400" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-md mb-6">
            عذراً، حدث خطأ أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.
          </p>
          
          {import.meta.env.MODE === 'development' && this.state.error && (
            <pre className="bg-[#1E293B] text-red-300 p-4 rounded-lg text-sm text-left max-w-lg overflow-auto mb-6 border border-red-900/30" dir="ltr">
              {this.state.error.toString()}
            </pre>
          )}
          
          <button 
            onClick={this.handleReset}
            className="bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={20} />
            إعادة المحاولة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
