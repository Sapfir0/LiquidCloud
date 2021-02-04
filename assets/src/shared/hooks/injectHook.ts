import { useState } from 'react';
import container from '../../inversify/inversifyContainer';

export function useInject<T>(id: string | symbol): T {
	const [store, setStore] = useState(() => {
		return container.get<T>(id);
	});
	return store;
}
