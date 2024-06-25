import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function useCal() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", {
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    })
}