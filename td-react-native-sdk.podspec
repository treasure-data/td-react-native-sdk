require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "td-react-native-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  td-react-native-sdk
                   DESC
  s.homepage     = "https://github.com/github_account/td-react-native-sdk"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Your Name" => "yourname@email.com" }
  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/github_account/td-react-native-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency "TreasureData-iOS-SDK", "= 1.0.1"
end

