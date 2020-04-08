FROM ruby:2.7.1

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install nodejs \
                    -y yarn  && \
    bundle install && \
    bundle exec rails webpacker:install && \
    bundle exec rails webpacker:install:typescript && \
    yarn install

COPY . ./