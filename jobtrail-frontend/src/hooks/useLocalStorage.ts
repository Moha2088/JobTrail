export function useLocalStorage<T>(key: string) {

    const setItem = (value: T) => {
        if(typeof window !== "undefined") {
            try {
                localStorage.setItem(key, JSON.stringify(value))
            }

            catch (error) {
                console.log(error)
            }
        }
    }

    const getItem = (): T | undefined => {
        if(typeof window !== "undefined") {
            try {
                const item = localStorage.getItem(key)
                return JSON.parse(item!) as T
            }

            catch (error) {
                console.log(error)
            }
        }
    }

    const removeItem = () => {
        if(typeof window !== "undefined") {
            try {
                localStorage.removeItem(key)
            }

            catch (error) {
                console.log(error)
            }
        }
    }

    return {
        setItem,
        getItem,
        removeItem
    }
}
