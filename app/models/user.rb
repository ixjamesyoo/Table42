# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  zipcode         :integer          not null
#

class User < ApplicationRecord
  validates :email, :password_digest, :session_token, :fname, :lname, :zipcode, presence: true
  validates :email, :session_token, uniqueness: true
  validates_format_of :zipcode, with: /\d{5}/, message: "Zipcode must be 5 digits"
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  attr_reader :password

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64
    end
    token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token
    self.update!(session_token: User.generate_session_token)
    self.session_token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def full_name
    "#{fname} #{lname}"
  end
end
