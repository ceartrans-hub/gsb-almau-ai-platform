export type LeadPayload = {
  name: string;
  phone?: string;
  email?: string;
  comment?: string;
  pageUrl?: string;
  utm?: Record<string, string | null>;
};

export async function sendLeadToBitrix(payload: LeadPayload) {
  const webhook = process.env.BITRIX_WEBHOOK_URL;
  if (!webhook) {
    return { ok: false, message: 'BITRIX_WEBHOOK_URL is not set' };
  }

  const body = {
    fields: {
      TITLE: `Заявка с сайта GSB AlmaU`,
      NAME: payload.name || 'Без имени',
      PHONE: payload.phone ? [{ VALUE: payload.phone, VALUE_TYPE: 'WORK' }] : [],
      EMAIL: payload.email ? [{ VALUE: payload.email, VALUE_TYPE: 'WORK' }] : [],
      COMMENTS: payload.comment || '',
      SOURCE_ID: 'WEBSITE_AI',
      SOURCE_DESCRIPTION: 'Website AI',
      UF_CRM_PAGE_URL: payload.pageUrl || '',
      UF_CRM_UTM_SOURCE: payload.utm?.utm_source || '',
      UF_CRM_UTM_MEDIUM: payload.utm?.utm_medium || '',
      UF_CRM_UTM_CAMPAIGN: payload.utm?.utm_campaign || '',
      UF_CRM_UTM_CONTENT: payload.utm?.utm_content || '',
      UF_CRM_UTM_TERM: payload.utm?.utm_term || ''
    }
  };

  const response = await fetch(`${webhook}/crm.lead.add.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    return { ok: false, message: 'Bitrix request failed' };
  }

  return { ok: true };
}
