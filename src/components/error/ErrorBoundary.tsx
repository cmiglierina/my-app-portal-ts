import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorComponent from "./ErrorPage";



interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: string
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };
    constructor(props:Props) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: Error) : State{
        // Update state so the next render will show the fallback UI.

        return { hasError: true, error: error.message + ' ' + error.cause };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log('ERRORE ', error, errorInfo);
        console.table(error);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            const text = this.state.error? this.state.error:'Si è verificato un errore';
            return <ErrorComponent text={text} />
        }

        return this.props.children;
    }
}