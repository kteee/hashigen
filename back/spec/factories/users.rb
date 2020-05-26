FactoryBot.define do
  factory :user do
    email { 'keitamukaijima@gmail.com' } 
    password_digest { 'aikotoba' }
    name { 'Mugi' }
    role_id  { 1 }
    account_id { 1 }
  end
end