export interface ErrorBoundaryState {
   hasError: boolean;
   error: Error | null;
}

export interface ErrorInfo {
   componentStack: string;
   digest: string;
}

export interface ErrorComponentProps {
   error: Error | null;
}
