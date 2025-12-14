import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { setupGlobalErrorHandler } from './utils/errorHandler';

// Инициализируем глобальный обработчик ошибок
setupGlobalErrorHandler();

const root = createRoot( document.getElementById( 'root' )! );

root.render(
	<Provider store={ store }>
		<ErrorBoundary>
			<App/>
		</ErrorBoundary>
	</Provider>,
);
