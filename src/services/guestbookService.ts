const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

export interface GuestMessage {
    name: string;
    msg: string;
    date?: string;
}

/**
 * 방명록 메시지를 Google Sheet에 저장합니다.
 * @param name 작성자 이름
 * @param message 메시지 내용
 * @returns 성공 여부 (boolean)
 */
export const saveMessage = async (name: string, message: string): Promise<boolean> => {
    if (!GOOGLE_SHEET_URL) {
        console.error("Google Sheet URL is not configured in .env.local");
        return false;
    }

    try {
        // Google Apps Script Web App은 POST 요청 시 302 Redirect를 반환합니다.
        // 브라우저 보안(CORS) 정책상 Redirect 응답의 내용을 읽으려면 복잡한 설정이 필요하거나 불가능할 수 있습니다.
        // 'no-cors' 모드를 사용하면 응답 내용은 읽을 수 없지만(Opaque Response), 요청 자체는 서버에 정상적으로 도달합니다.
        // 따라서 여기서는 전송 후 에러가 발생하지 않으면 성공으로 간주합니다.

        await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain", // application/json 대신 사용하여 Preflight 요청 방지
            },
            body: JSON.stringify({ name, message }),
        });

        return true;
    } catch (error) {
        console.error("Failed to save message to Google Sheet:", error);
        return false;
    }
};

/**
 * 방명록 메시지를 Google Sheet에서 가져옵니다.
 * @returns 메시지 배열 (GuestMessage[])
 */
export const fetchMessages = async (): Promise<GuestMessage[]> => {
    if (!GOOGLE_SHEET_URL) {
        console.error("Google Sheet URL is not configured in .env.local");
        return [];
    }

    try {
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: "GET",
            // GET 요청은 기본적으로 JSON 데이터를 받아올 수 있도록 처리됩니다.
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch messages from Google Sheet:", error);
        return [];
    }
};
