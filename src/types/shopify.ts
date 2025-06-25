// Money types
interface Money {
  amount: string;
  currency_code: string;
}

interface MoneySet {
  shop_money: Money;
  presentment_money: Money;
}

// Address types
interface Address {
  first_name: string | null;
  last_name: string | null;
  address1: string;
  address2: string | null;
  company: string | null;
  city: string;
  zip: string;
  province: string;
  country: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  name: string;
  country_code: string;
  province_code: string;
}

// Customer types
interface Customer {
  id: number;
  email: string;
  created_at: string | null;
  updated_at: string | null;
  first_name: string;
  last_name: string;
  state: string;
  note: string | null;
  verified_email: boolean;
  multipass_identifier: string | null;
  tax_exempt: boolean;
  phone: string | null;
  currency: string;
  tax_exemptions: any[];
  admin_graphql_api_id: string;
  default_address: Address;
}

// Line item types
interface TaxLine {
  title: string;
  price: string;
  rate: number;
}

interface DiscountAllocation {
  amount: string;
  discount_application_index: number;
}

interface LineItem {
  id: number;
  admin_graphql_api_id: string;
  attributed_staffs: any[];
  current_quantity: number;
  fulfillable_quantity: number;
  fulfillment_service: string;
  fulfillment_status: string | null;
  gift_card: boolean;
  grams: number;
  name: string;
  price: string;
  price_set: MoneySet;
  product_exists: boolean;
  product_id: number;
  properties: any[];
  quantity: number;
  requires_shipping: boolean;
  sales_line_item_group_id: number | null;
  sku: string;
  taxable: boolean;
  title: string;
  total_discount: string;
  total_discount_set: MoneySet;
  variant_id: number;
  variant_inventory_management: string;
  variant_title: string | null;
  vendor: string | null;
  tax_lines: TaxLine[];
  duties: any[];
  discount_allocations: DiscountAllocation[];
}

// Shipping line types
interface ShippingLine {
  id: number;
  carrier_identifier: string | null;
  code: string | null;
  current_discounted_price_set: MoneySet;
  discounted_price: string;
  discounted_price_set: MoneySet;
  is_removed: boolean;
  phone: string | null;
  price: string;
  price_set: MoneySet;
  requested_fulfillment_service_id: string | null;
  source: string;
  title: string;
  tax_lines: TaxLine[];
  discount_allocations: DiscountAllocation[];
}

// Main order type
export interface ShopifyOrder {
  id: number;
  admin_graphql_api_id: string;
  app_id: number | null;
  browser_ip: string | null;
  buyer_accepts_marketing: boolean;
  cancel_reason: string | null;
  cancelled_at: string | null;
  cart_token: string | null;
  checkout_id: string | null;
  checkout_token: string | null;
  client_details: any | null;
  closed_at: string | null;
  confirmation_number: string | null;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_shipping_price_set: MoneySet;
  current_subtotal_price: string;
  current_subtotal_price_set: MoneySet;
  current_total_additional_fees_set: MoneySet | null;
  current_total_discounts: string;
  current_total_discounts_set: MoneySet;
  current_total_duties_set: MoneySet | null;
  current_total_price: string;
  current_total_price_set: MoneySet;
  current_total_tax: string;
  current_total_tax_set: MoneySet;
  customer_locale: string;
  device_id: string | null;
  discount_codes: any[];
  duties_included: boolean;
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: string | null;
  landing_site: string | null;
  landing_site_ref: string | null;
  location_id: number | null;
  merchant_business_entity_id: string;
  merchant_of_record_app_id: number | null;
  name: string;
  note: string | null;
  note_attributes: any[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: MoneySet | null;
  original_total_duties_set: MoneySet | null;
  payment_gateway_names: string[];
  phone: string | null;
  po_number: string | null;
  presentment_currency: string;
  processed_at: string;
  reference: string | null;
  referring_site: string | null;
  source_identifier: string | null;
  source_name: string;
  source_url: string | null;
  subtotal_price: string;
  subtotal_price_set: MoneySet;
  tags: string;
  tax_exempt: boolean;
  tax_lines: TaxLine[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_cash_rounding_payment_adjustment_set: MoneySet;
  total_cash_rounding_refund_adjustment_set: MoneySet;
  total_discounts: string;
  total_discounts_set: MoneySet;
  total_line_items_price: string;
  total_line_items_price_set: MoneySet;
  total_outstanding: string;
  total_price: string;
  total_price_set: MoneySet;
  total_shipping_price_set: MoneySet;
  total_tax: string;
  total_tax_set: MoneySet;
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  billing_address: Address;
  customer: Customer;
  discount_applications: any[];
  fulfillments: any[];
  line_items: LineItem[];
  payment_terms: any | null;
  refunds: any[];
  shipping_address: Address;
  shipping_lines: ShippingLine[];
  returns: any[];
}