const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const supabase = require('./supabase');
const { v4: uuidv4 } = require('uuid');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Search by google_id
        let { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('google_id', profile.id);

        if (error) throw error;

        let user;

        if (!users || users.length === 0) {
          // Search by email
          const email = profile.emails[0].value;
          let { data: existingUsers, error: emailError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);

          if (emailError) throw emailError;

          if (!existingUsers || existingUsers.length === 0) {
            // Create new user with manual ID
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  id: uuidv4(),
                  full_name: profile.displayName,
                  email: email,
                  google_id: profile.id,
                  role: 'PATIENT',
                  created_at: new Date().toISOString()
                }
              ])
              .select()
              .single();

            if (insertError) throw insertError;
            user = newUser;
          } else {
            // Update existing user with google_id
            const { data: updatedUser, error: updateError } = await supabase
              .from('users')
              .update({ google_id: profile.id })
              .eq('id', existingUsers[0].id)
              .select()
              .single();

            if (updateError) throw updateError;
            user = updatedUser;
          }
        } else {
          user = users[0];
        }

        return done(null, user);
      } catch (error) {
        console.error('Passport strategy error:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
